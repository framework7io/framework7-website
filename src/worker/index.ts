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
    })
  )
  .route('/mcp', mcpApp)
  .get('*', async (c) => {
    return c.env.ASSETS.fetch(c.req.url);
  });

export default app;
