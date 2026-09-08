// src/capture.ts
var DEFAULT_CAPTURE_HEADERS = [
  "sec-fetch-mode",
  "sec-fetch-dest",
  "sec-fetch-site",
  "sec-fetch-user",
  "sec-ch-ua",
  "sec-ch-ua-platform",
  "sec-ch-ua-mobile",
  "accept-language",
  "accept-encoding",
  "from",
  "x-agent",
  "signature-agent",
  "signature-input",
  "purpose",
  "sec-purpose",
  "x-requested-with"
];
var DEFAULT_CF_HEADERS = {
  verifiedBotCategory: "x-verified-bot-category"
};
var MAX = { ua: 1024, path: 2048, accept: 256, referer: 256, contentType: 128, header: 256 };
function clip(value, max) {
  if (!value) return void 0;
  return value.length > max ? value.slice(0, max) : value;
}
function refererHost(value) {
  if (!value) return void 0;
  try {
    return new URL(value).hostname;
  } catch {
    return void 0;
  }
}
function cfSignals(req, opts) {
  const cf = req.cf;
  const categoryHeader = opts.cfHeaders?.verifiedBotCategory ?? DEFAULT_CF_HEADERS.verifiedBotCategory;
  const category = req.headers.get(categoryHeader) || void 0;
  if (!cf && !category) return void 0;
  const out = {};
  if (cf?.country) out.country = cf.country;
  if (typeof cf?.asn === "number") out.asn = cf.asn;
  if (cf?.asOrganization) out.asOrganization = cf.asOrganization;
  if (cf?.colo) out.colo = cf.colo;
  if (category) out.verifiedBotCategory = category;
  const bm = cf?.botManagement;
  if (bm) {
    if (typeof bm.score === "number") out.botScore = bm.score;
    if (typeof bm.verifiedBot === "boolean") out.verifiedBot = bm.verifiedBot;
    if (bm.signedAgent) out.signedAgent = bm.signedAgent;
  }
  if (out.verifiedBot === void 0 && category) out.verifiedBot = true;
  return out;
}
function captureEvent(req, res, startedAt, opts = {}) {
  const url = new URL(req.url);
  const names = opts.captureHeaders ?? DEFAULT_CAPTURE_HEADERS;
  const headers = {};
  for (const name of names) {
    const v = req.headers.get(name);
    if (v) headers[name] = clip(v, MAX.header);
  }
  const event = {
    ts: startedAt,
    host: url.hostname,
    method: req.method,
    path: clip(opts.includeQuery ? url.pathname + url.search : url.pathname, MAX.path) ?? "/",
    status: res.status,
    ua: clip(req.headers.get("user-agent"), MAX.ua) ?? "",
    headers
  };
  const accept = clip(req.headers.get("accept"), MAX.accept);
  if (accept) event.accept = accept;
  const referer = refererHost(req.headers.get("referer"));
  if (referer) event.referer = referer;
  const ct = clip(res.headers.get("content-type"), MAX.contentType);
  if (ct) event.resContentType = ct;
  const len = res.headers.get("content-length");
  if (len && /^\d+$/.test(len)) event.resBytes = Number(len);
  event.durationMs = Math.max(0, Date.now() - startedAt);
  const cf = cfSignals(req, opts);
  if (cf) event.cf = cf;
  return event;
}

// src/client.ts
var MAX_BATCH = 250;
function createClient(opts) {
  const doFetch = opts.fetch ?? globalThis.fetch;
  async function post(batch) {
    try {
      const res = await doFetch(opts.endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${opts.siteKey}`
        },
        body: JSON.stringify({ events: batch })
      });
      if (!res.ok && opts.debug) {
        console.warn(`[agent-analytics] collector responded ${res.status}`);
      }
      await res.body?.cancel();
    } catch (err) {
      if (opts.debug) console.warn("[agent-analytics] delivery failed", err);
    }
  }
  return {
    async send(events) {
      if (events.length === 0) return;
      if (events.length <= MAX_BATCH) return post(events);
      const jobs = [];
      for (let i = 0; i < events.length; i += MAX_BATCH) {
        jobs.push(post(events.slice(i, i + MAX_BATCH)));
      }
      await Promise.all(jobs);
    }
  };
}

// src/track.ts
var CUSTOM_EVENT_LIMITS = {
  perRequest: 20,
  name: 64,
  value: 256,
  query: 512,
  propsKeys: 20
};
var buffers = /* @__PURE__ */ new WeakMap();
function openBuffer(req) {
  buffers.set(req, []);
}
function closeBuffer(req) {
  const events = buffers.get(req) ?? [];
  buffers.delete(req);
  return events;
}
function requestOf(target) {
  if (target instanceof Request) return target;
  const raw = target.req?.raw;
  return raw instanceof Request ? raw : void 0;
}
function clip2(s, max) {
  return s.length > max ? s.slice(0, max) : s;
}
function track(target, name, data = {}) {
  try {
    const req = requestOf(target);
    if (!req) return;
    const buffer = buffers.get(req);
    if (!buffer || buffer.length >= CUSTOM_EVENT_LIMITS.perRequest) return;
    if (typeof name !== "string" || !name) return;
    const event = { name: clip2(name, CUSTOM_EVENT_LIMITS.name), ts: Date.now() };
    if (typeof data.value === "string" && data.value) event.value = clip2(data.value, CUSTOM_EVENT_LIMITS.value);
    if (typeof data.query === "string" && data.query) event.query = clip2(data.query, CUSTOM_EVENT_LIMITS.query);
    if (data.props && typeof data.props === "object") {
      const props = {};
      let n = 0;
      for (const [k, v] of Object.entries(data.props)) {
        if (n >= CUSTOM_EVENT_LIMITS.propsKeys) break;
        if (typeof v === "boolean" || typeof v === "number" && Number.isFinite(v)) props[k] = v;
        else if (typeof v === "string") props[k] = clip2(v, CUSTOM_EVENT_LIMITS.value);
        else continue;
        n++;
      }
      if (n > 0) event.props = props;
    }
    buffer.push(event);
  } catch {
  }
}

// src/index.ts
function background(ctx, job) {
  try {
    const p = job();
    if (ctx && typeof ctx.waitUntil === "function") ctx.waitUntil(p);
  } catch {
  }
}
function agentAnalytics(opts) {
  const client = createClient(opts);
  return async (c, next) => {
    const startedAt = Date.now();
    openBuffer(c.req.raw);
    await next();
    const events = closeBuffer(c.req.raw);
    let ctx;
    try {
      ctx = c.executionCtx;
    } catch {
      ctx = void 0;
    }
    background(ctx, async () => {
      const event = captureEvent(c.req.raw, c.res, startedAt, opts);
      if (events.length) event.events = events;
      if (opts.ignore?.(c.req.raw, event)) return;
      await client.send([event]);
    });
  };
}
function withAgentAnalytics(handler, opts) {
  const client = createClient(opts);
  return async (request, env, ctx) => {
    const startedAt = Date.now();
    openBuffer(request);
    let response;
    try {
      response = await handler(request, env, ctx);
    } catch (err) {
      closeBuffer(request);
      throw err;
    }
    const events = closeBuffer(request);
    background(ctx, async () => {
      const event = captureEvent(request, response, startedAt, opts);
      if (events.length) event.events = events;
      if (opts.ignore?.(request, event)) return;
      await client.send([event]);
    });
    return response;
  };
}
export {
  DEFAULT_CAPTURE_HEADERS,
  DEFAULT_CF_HEADERS,
  MAX_BATCH,
  agentAnalytics,
  captureEvent,
  createClient,
  track,
  withAgentAnalytics
};
