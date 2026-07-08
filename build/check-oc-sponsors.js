/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const https = require('https');

// Config (override via env) ------------------------------------------------
const OC_SLUG = process.env.OC_SLUG || 'framework7';
const OC_TOKEN = process.env.OC_TOKEN || '';
// A payment is considered "current" if it happened within this many days.
const SAFE_DAYS = Number(process.env.SAFE_DAYS || 45);
// Yearly plans get a full year plus the same grace window.
const YEARLY_DAYS = Number(process.env.YEARLY_DAYS || 365) + SAFE_DAYS;

const DAY = 24 * 60 * 60 * 1000;
const sponsorsPath = path.resolve(__dirname, '../src/pug/sponsors/sponsors.json');

// Minimal GraphQL client with retry/backoff for rate limits ----------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function request(query) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });
    const req = https.request(
      'https://api.opencollective.com/graphql/v2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          ...(OC_TOKEN ? { 'Personal-Token': OC_TOKEN } : {}),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function gql(query) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    // eslint-disable-next-line no-await-in-loop
    const { status, body } = await request(query);
    let json = null;
    try {
      json = JSON.parse(body);
    } catch (e) {
      json = null;
    }
    if (json && json.data) return json.data;
    const rateLimited =
      status === 429 ||
      !json ||
      (json.errors && /rate/i.test(JSON.stringify(json.errors)));
    if (rateLimited) {
      const wait = 2000 * 2 ** attempt;
      process.stderr.write(`  rate-limited (status ${status}), waiting ${wait}ms...\n`);
      // eslint-disable-next-line no-await-in-loop
      await sleep(wait);
      continue;
    }
    throw new Error(`GraphQL error: ${body.slice(0, 300)}`);
  }
  throw new Error('Exhausted retries talking to the Open Collective API');
}

// Fetch every incoming order and reduce to one record per contributor -------
async function fetchOrderMap() {
  const map = {};
  const LIMIT = 100;
  let offset = 0;
  let total = Infinity;
  while (offset < total) {
    // eslint-disable-next-line no-await-in-loop
    const data = await gql(`query {
      account(slug: "${OC_SLUG}") {
        orders(filter: INCOMING, limit: ${LIMIT}, offset: ${offset}, includeIncognito: true) {
          totalCount
          nodes {
            status
            frequency
            createdAt
            fromAccount { slug }
            transactions { kind type createdAt }
          }
        }
      }
    }`);
    const orders = data.account.orders;
    total = orders.totalCount;
    for (const order of orders.nodes) {
      const slug = order.fromAccount && order.fromAccount.slug;
      if (!slug) continue;
      const lastPaid =
        (order.transactions || [])
          .filter((t) => t.kind === 'CONTRIBUTION' && t.type === 'CREDIT')
          .map((t) => t.createdAt)
          .sort()
          .pop() || null;
      const record = {
        frequency: order.frequency,
        status: order.status,
        lastPaid,
        orderCreated: order.createdAt,
      };
      const current = map[slug];
      // Keep the order with the most recent successful payment.
      if (!current || (lastPaid && (!current.lastPaid || lastPaid > current.lastPaid))) {
        map[slug] = record;
      }
    }
    offset += LIMIT;
    process.stderr.write(`  fetched ${Math.min(offset, total)}/${total} orders\r`);
  }
  process.stderr.write('\n');
  return map;
}

// Decide keep/remove for a single sponsor ----------------------------------
function classify(sponsor, map, now) {
  const slug = sponsor.ref.split('opencollective.com/')[1];

  // Honour a manually set future end date (fixed-term / direct deals).
  if (sponsor.endDate && new Date(sponsor.endDate).getTime() > now) {
    return { keep: true, slug, reason: 'manual endDate in future' };
  }

  const rec = map[slug];
  if (!rec) {
    return { keep: false, slug, reason: 'no OC contribution record', flag: true };
  }
  if (!rec.lastPaid) {
    return { keep: false, slug, reason: 'never paid', rec };
  }

  const ageDays = Math.floor((now - new Date(rec.lastPaid).getTime()) / DAY);
  const isYearly = rec.frequency === 'YEARLY';
  const limit = isYearly ? YEARLY_DAYS : SAFE_DAYS;

  if (ageDays > limit) {
    return {
      keep: false,
      slug,
      rec,
      ageDays,
      reason: `${rec.frequency.toLowerCase()} lapsed (${ageDays}d since last payment > ${limit}d)`,
    };
  }
  return { keep: true, slug, rec, ageDays, reason: `paid ${ageDays}d ago` };
}

// Main ---------------------------------------------------------------------
(async () => {
  const apply = process.argv.includes('--apply');
  const jsonOut = process.argv.includes('--json');

  if (!OC_TOKEN) {
    process.stderr.write(
      'WARNING: no OC_TOKEN set - using the unauthenticated API (rate limited, no incognito).\n'
    );
  }

  const map = await fetchOrderMap();
  const now = Date.now();
  const sponsors = JSON.parse(fs.readFileSync(sponsorsPath, 'utf-8'));

  const results = sponsors.map((sponsor) => {
    if (!sponsor.ref || !sponsor.ref.includes('opencollective.com')) {
      return { keep: true, sponsor, reason: 'not an OC sponsor', skip: true };
    }
    return { ...classify(sponsor, map, now), sponsor };
  });

  const toRemove = results.filter((r) => !r.keep);
  const removeRefs = toRemove.map((r) => r.sponsor.ref);

  if (jsonOut) {
    console.log(JSON.stringify(removeRefs, null, 2));
    return;
  }

  // Human-readable report.
  const flagged = toRemove.filter((r) => r.flag);
  const lapsed = toRemove.filter((r) => !r.flag);
  const ocCount = results.filter((r) => !r.skip).length;

  console.log(`\nFramework7 OC sponsors checked: ${ocCount}`);
  console.log(`  keep:   ${ocCount - toRemove.length}`);
  console.log(`  remove: ${toRemove.length}\n`);

  if (lapsed.length) {
    console.log('REMOVE - lapsed / cancelled:');
    lapsed
      .sort((a, b) => (b.ageDays || 0) - (a.ageDays || 0))
      .forEach((r) =>
        console.log(
          `  ${r.slug.padEnd(38)} ${r.reason}${r.rec ? ` [${r.rec.status}]` : ''}`
        )
      );
    console.log('');
  }
  if (flagged.length) {
    console.log('REMOVE - needs a look (no record in OC / deleted account):');
    flagged.forEach((r) => console.log(`  ${r.slug.padEnd(38)} ${r.reason}`));
    console.log('');
  }

  if (apply) {
    const kept = sponsors.filter((s) => !removeRefs.includes(s.ref));
    fs.writeFileSync(sponsorsPath, `${JSON.stringify(kept, null, 2)}\n`);
    console.log(`Applied: removed ${removeRefs.length}, wrote ${kept.length} sponsors.\n`);
  } else {
    console.log('Dry run. Re-run with --apply to write the pruned list, or --json for refs.\n');
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
