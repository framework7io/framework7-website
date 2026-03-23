import { Hono } from 'hono';

const mcpApp = new Hono<{ Bindings: CloudflareBindings }>();

mcpApp.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

export { mcpApp };
