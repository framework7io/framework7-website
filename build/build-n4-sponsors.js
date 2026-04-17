const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'https://sponsors.nolimits4web.com/api/sponsors/framework7';
const OUTPUT_PATH = path.resolve(__dirname, '../src/pug/sponsors/n4-sponsors.json');

const PLAN_MAP = {
  'Gold Sponsor': 'silverSponsor',
  Sponsor: 'topSupporter',
};

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          res.resume();
          reject(new Error(`Request failed with status ${res.statusCode}`));
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on('error', reject);
  });
}

module.exports = async (cb) => {
  try {
    const raw = await fetchJSON(API_URL);
    if (!Array.isArray(raw)) {
      throw new Error('Unexpected sponsors API response');
    }
    const mapped = raw
      .map((item) => ({
        createdAt: item.createdAt,
        title: item.title || '',
        link: item.link || '',
        plan: PLAN_MAP[item.plan] || 'silverSponsor',
        ref: '',
        image: item.image || '',
        endDate: '',
        active: true,
      }))
      .filter((item) => item.image || item.title);

    fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(mapped, null, 2)}\n`);
    console.log(
      `Fetched ${mapped.length} N4 sponsors -> ${path.relative(process.cwd(), OUTPUT_PATH)}`,
    );
  } catch (err) {
    console.warn(`[build-n4-sponsors] Failed to fetch sponsors: ${err.message}. Using empty list.`);
    if (!fs.existsSync(OUTPUT_PATH)) {
      fs.writeFileSync(OUTPUT_PATH, '[]\n');
    }
  }
  if (cb) cb();
};
