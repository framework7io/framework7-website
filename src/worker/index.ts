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
  .get('*', async (c) => {
    const response = await c.env.ASSETS.fetch(c.req.url);
    const country = (c.req.raw.cf as IncomingRequestCfProperties | undefined)?.country;
    const contentType = response.headers.get('content-type') || '';
    if (country === 'CN' && contentType.includes('text/html')) {
      return new HTMLRewriter()
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

    return response;
  });

export default app;
