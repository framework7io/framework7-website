import { MiddlewareHandler } from 'hono';

/**
 * What the SDK captures for one request. Kept deliberately raw: the
 * collector does all interpretation, so the SDK never needs a redeploy
 * when the registry or the classifier changes.
 *
 * No IP address is ever included.
 */
interface RawEvent {
    /** Unix ms */
    ts: number;
    host: string;
    method: string;
    /** Path without query string unless the SDK is told to include it */
    path: string;
    status: number;
    ua: string;
    accept?: string;
    /** Host part of the Referer only */
    referer?: string;
    /** Content-Type the client actually received */
    resContentType?: string;
    /** From Content-Length when the response has one */
    resBytes?: number;
    durationMs?: number;
    cf?: RawCfSignals;
    /**
     * Allowlisted request headers, lower-cased names. The SDK default list is
     * the behavioural signals: sec-fetch-*, from, x-agent, signature-agent,
     * user-agent hints.
     */
    headers?: Record<string, string>;
    /**
     * Custom events recorded during this request via the SDK's `track()`,
     * e.g. an MCP tool call with its arguments. They are stored as separate
     * data points that inherit the request's agent classification and path.
     */
    events?: CustomEvent[];
}
/** Something the site chose to record about a request: what was asked for. */
interface CustomEvent {
    /** Dotted name, e.g. "mcp.tool", "mcp.call", "search" */
    name: string;
    /** Primary dimension, e.g. the tool or method name */
    value?: string;
    /** Free-text intent, e.g. a search query or tool argument */
    query?: string;
    /** Extra flat properties, stored as JSON */
    props?: Record<string, string | number | boolean>;
    /** Unix ms, defaults to the request timestamp */
    ts?: number;
}
/**
 * Signals from Cloudflare when the site is behind Cloudflare.
 *
 * `asn`, `asOrganization`, `country`, `colo` come from `request.cf` on every
 * plan. `botManagement` exists only with Enterprise Bot Management.
 * `verifiedBot` and `verifiedBotCategory` are rules-language fields
 * (`cf.client.bot`, `cf.verified_bot_category`), available on every plan but
 * not on `request.cf`; the site forwards them with a Request Header
 * Transform Rule and the SDK reads the headers.
 */
interface RawCfSignals {
    country?: string;
    asn?: number;
    asOrganization?: string;
    colo?: string;
    verifiedBot?: boolean;
    verifiedBotCategory?: string;
    botScore?: number;
    signedAgent?: string;
}

interface CaptureOptions {
    /** Keep the query string in `path`. Off by default: it is rarely useful and often leaks tokens. */
    includeQuery?: boolean;
    /** Lower-case request header names to forward. Defaults to {@link DEFAULT_CAPTURE_HEADERS}. */
    captureHeaders?: string[];
    /**
     * Header names a Cloudflare Request Header Transform Rule writes the
     * rules-language bot fields into. Defaults to {@link DEFAULT_CF_HEADERS}.
     */
    cfHeaders?: {
        verifiedBotCategory?: string;
    };
}
/**
 * Behavioural signals only. Never cookies, authorization, or anything that
 * identifies the person behind a browser.
 */
declare const DEFAULT_CAPTURE_HEADERS: readonly string[];
declare const DEFAULT_CF_HEADERS: {
    readonly verifiedBotCategory: "x-verified-bot-category";
};
/** Build the event for one request/response pair. Never throws. */
declare function captureEvent(req: Request, res: Response, startedAt: number, opts?: CaptureOptions): RawEvent;

interface ClientOptions {
    /** Site key from the dashboard, `aa_...` */
    siteKey: string;
    /** Collector URL, e.g. https://api.example.com/v1/events */
    endpoint: string;
    /** Override fetch (tests, custom agents) */
    fetch?: typeof fetch;
    /** Log delivery failures to console.warn */
    debug?: boolean;
}
/** The collector writes at most this many data points per request. */
declare const MAX_BATCH = 250;
interface Client {
    /** Deliver events. Resolves once the request finished; never rejects. */
    send(events: RawEvent[]): Promise<void>;
}
declare function createClient(opts: ClientOptions): Client;

interface TrackData {
    /** Primary dimension, e.g. the tool or method name */
    value?: string;
    /** Free-text intent, e.g. a search query or the main tool argument */
    query?: string;
    /** Extra flat properties. Non-primitive values are dropped. */
    props?: Record<string, unknown>;
}
/** Anything that carries the request: a Request, or a Hono-style context. */
type TrackTarget = Request | {
    req: {
        raw: Request;
    };
};
/**
 * Record what a request asked for, e.g. an MCP tool call or a search query.
 *
 * ```ts
 * track(c, 'mcp.tool', { value: 'search-api', query: args.query });
 * ```
 *
 * The event ships together with the request event when the response is
 * done, and is stored with the request's agent classification and path.
 * A no-op when the analytics middleware is not installed. Never throws.
 */
declare function track(target: TrackTarget, name: string, data?: TrackData): void;

interface AgentAnalyticsOptions extends ClientOptions, CaptureOptions {
    /**
     * Return true to drop an event. Runs after the response is produced, so
     * it can look at both the request and the captured event.
     */
    ignore?: (req: Request, event: RawEvent) => boolean;
}
interface WaitUntilContext {
    waitUntil(promise: Promise<unknown>): void;
}
/**
 * Hono middleware.
 *
 * ```ts
 * app.use('*', agentAnalytics({ siteKey: env.AA_SITE_KEY, endpoint: 'https://.../v1/events' }));
 * ```
 *
 * Adds no latency: the event is shipped in `executionCtx.waitUntil` after
 * the response has been returned.
 */
declare function agentAnalytics(opts: AgentAnalyticsOptions): MiddlewareHandler;
type FetchHandler<Env> = (request: Request, env: Env, ctx: WaitUntilContext) => Response | Promise<Response>;
/**
 * Wrap a plain Worker / Vercel Edge style fetch handler.
 *
 * ```ts
 * export default { fetch: withAgentAnalytics(handler, { siteKey, endpoint }) };
 * ```
 */
declare function withAgentAnalytics<Env>(handler: FetchHandler<Env>, opts: AgentAnalyticsOptions): FetchHandler<Env>;

export { type AgentAnalyticsOptions, type CaptureOptions, type Client, type ClientOptions, type CustomEvent, DEFAULT_CAPTURE_HEADERS, DEFAULT_CF_HEADERS, MAX_BATCH, type RawCfSignals, type RawEvent, type TrackData, type TrackTarget, agentAnalytics, captureEvent, createClient, track, withAgentAnalytics };
