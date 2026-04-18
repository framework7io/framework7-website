import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { mcpApp } from './mcp/index';

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .use(
    '/mcp/*',
    cors({
      origin: '*',
      allowHeaders: ['*'],
      maxAge: 86400,
      allowMethods: ['GET', 'POST', 'OPTIONS'],
    }),
  )
  .route('/mcp', mcpApp)
  .get('/.well-known/mcp/server-card.json', (c) => {
    const origin = new URL(c.req.url).origin;
    return c.json({
      serverInfo: {
        name: 'framework7-mcp-server',
        version: '1.0.0',
      },
      description:
        'Framework7 MCP server — search and retrieve Framework7 component APIs, parameters, methods, events, CSS variables, and demo source code.',
      transport: {
        type: 'http',
        endpoint: `${origin}/mcp`,
      },
      capabilities: ['tools'],
      supportedProtocolVersions: ['2024-11-05'],
    });
  })
  .get('*', async (c) => {
    const response = await c.env.ASSETS.fetch(c.req.url);
    const country = (c.req.raw.cf as IncomingRequestCfProperties | undefined)?.country;
    const contentType = response.headers.get('content-type') || '';

    const url = new URL(c.req.url);
    const isHomepage = url.pathname === '/' || url.pathname === '/index.html';

    let finalResponse = response;

    if (country === 'CN' && contentType.includes('text/html')) {
      finalResponse = new HTMLRewriter()
        .on('head', {
          element(element) {
            element.prepend('<script>window.__NO_SPONSORS__=true</script>', { html: true });
          },
        })
        .on('[data-sponsors]', {
          element(element) {
            element.remove();
          },
        })
        .transform(response);
    }

    if (isHomepage && contentType.includes('text/html')) {
      finalResponse = new Response(finalResponse.body, finalResponse);
      finalResponse.headers.append('Link', '</docs/>; rel="service-doc"; title="Framework7 Documentation"');
      finalResponse.headers.append('Link', '</mcp>; rel="service-desc"; type="application/json"; title="Framework7 MCP Server"');
      finalResponse.headers.append('Link', '</sitemap.xml>; rel="sitemap"; type="application/xml"');
    }

    return finalResponse;
  });

export default app;
