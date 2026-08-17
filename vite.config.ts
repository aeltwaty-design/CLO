import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { IncomingMessage, ServerResponse } from 'node:http';

/** Mounts the same /api/comments handler the subdomain server uses
    (server/comments.mjs), so dev == deployed for the comment layer. The
    middleware must register synchronously — vite appends its SPA fallback
    right after configureServer, so an awaited use() would land behind it. */
function commentsApi(): Plugin {
  let handler: ((req: IncomingMessage, res: ServerResponse) => boolean) | null = null;
  const loaded = import('./server/comments.mjs').then((m) => {
    handler = m.handleCommentsApi;
  });
  const mw = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url?.startsWith('/api/comments')) return next();
    void loaded.then(() => {
      if (!handler || !handler(req, res)) next();
    });
  };
  return {
    name: 'clo-comments-api',
    configureServer: (server) => {
      server.middlewares.use(mw);
    },
    configurePreviewServer: (server) => {
      server.middlewares.use(mw);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), commentsApi()],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: Boolean(process.env.PORT),
  },
});
