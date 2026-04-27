/**
 * Integration tests for the `mc-scripts serve` command.
 *
 * These tests describe the observable HTTP behavior of the serve command.
 * They are intentionally agnostic of the underlying implementation so the
 * same suite can validate future reimplementations (e.g. Vite's preview
 * server) produce identical output.
 *
 * The server binds to an ephemeral port (`port: 0`) and is torn down after
 * every test. A minimal static tree (`index.html`, `favicon.png`,
 * `assets/app.js`) is written to a temp directory per test so `serve-handler`
 * has real files to read.
 *
 * Historical context (why these rules exist — for maintainers of the next
 * rewrite, not for readers of the tests):
 *
 *  - **#1787** (Oct 2020) introduced `mc-scripts serve` as a minimal static
 *    file server to replace `mc-http-server`. Favicon rewrite, SPA fallback,
 *    and the `/login` → `login.html` / `/logout` → `logout.html` rewrites
 *    were all part of the initial design.
 *  - **#3734** (Mar 2025) removed the static `login.html` / `logout.html`
 *    files from `mc-dev-authentication` and replaced the rewrites with
 *    inline runtime handlers, gated on `mcApiUrl` being a localhost URL.
 *    The SPA rewrite glob keeps its `login|logout` exclusion — a leftover
 *    that now causes non-localhost `/login*` and `/logout*` to 404 rather
 *    than fall back to the SPA.
 *
 * Load-bearing facts pinned by this suite (surfaced from a survey of
 * downstream consumer repos):
 *
 *  1. **Port 3001 is hardcoded in Cypress configs** in
 *     `merchant-center-frontend`, `merchant-center-operations`, and
 *     `merchant-center-prices`. The default port must stay 3001.
 *  2. **SPA fallback to `index.html`** is used extensively by those same
 *     Cypress suites for deep-link navigation.
 *  3. **The SPA glob must NOT swallow `/login/authorize`, `/logout`, or
 *     `/favicon*`** — downstream auth flow and the inline handlers below
 *     all depend on these paths reaching their dedicated branches.
 */

import fs from 'fs';
import type http from 'http';
import os from 'os';
import path from 'path';
// Use node-fetch directly: the spec runs under jsdom (the repo's default Jest
// environment) where `global.fetch` is routed through jsdom's XHR and blocks
// cross-origin requests to our ephemeral-port test server.
import fetch from 'node-fetch';
import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import run from './serve';

// 1x1 transparent PNG (smallest valid PNG).
const FAVICON_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64'
);
const INDEX_HTML = '<!doctype html><title>app</title><div id="root"></div>';
const ASSET_JS = 'console.log("app");';

type ServerContext = {
  server: http.Server;
  baseUrl: string;
};

const writeServedFiles = (): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-scripts-serve-'));
  fs.writeFileSync(path.join(dir, 'index.html'), INDEX_HTML);
  fs.writeFileSync(path.join(dir, 'favicon.png'), FAVICON_PNG);
  fs.mkdirSync(path.join(dir, 'assets'));
  fs.writeFileSync(path.join(dir, 'assets', 'app.js'), ASSET_JS);
  return dir;
};

const startServer = async (
  publicPath: string,
  mcApiUrl: string,
  extraOptions: { handleAuthRoutes?: boolean } = {}
): Promise<ServerContext> => {
  const applicationConfig = {
    env: { mcApiUrl },
  } as unknown as ApplicationRuntimeConfig;

  const server = await run({
    port: 0,
    publicPath,
    applicationConfig,
    ...extraOptions,
  });
  const address = server.address();
  if (!address || typeof address !== 'object') {
    throw new Error('Expected server to bind to an address');
  }
  return { server, baseUrl: `http://127.0.0.1:${address.port}` };
};

const stopServer = (context: ServerContext | undefined) =>
  new Promise<void>((resolve, reject) => {
    if (!context) {
      resolve();
      return;
    }
    context.server.close((err) => (err ? reject(err) : resolve()));
  });

describe('mc-scripts serve', () => {
  let fixtureDir: string;
  let context: ServerContext | undefined;

  beforeEach(() => {
    fixtureDir = writeServedFiles();
  });

  afterEach(async () => {
    await stopServer(context);
    context = undefined;
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  });

  // --- static file serving -------------------------------------------------
  // Intent: present since #1787. Baseline static file server responsibilities.

  describe('static file serving', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'https://mc.example.com');
    });

    it('serves index.html at the root', async () => {
      const res = await fetch(`${context!.baseUrl}/`);
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toMatch(/text\/html/);
      expect(await res.text()).toBe(INDEX_HTML);
    });

    it('serves hashed JS assets with the correct content type', async () => {
      const res = await fetch(`${context!.baseUrl}/assets/app.js`);
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toMatch(/javascript/);
      expect(await res.text()).toBe(ASSET_JS);
    });
  });

  // --- SPA fallback --------------------------------------------------------
  // Intent: present since #1787. Required by downstream Cypress suites that
  // navigate to deep routes (e.g. `/<project>/products/123`) and expect the
  // SPA shell to boot and handle the route client-side.

  describe('SPA fallback', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'https://mc.example.com');
    });

    it('falls back to index.html for unknown deep links', async () => {
      const res = await fetch(`${context!.baseUrl}/some/nested/route`);
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toMatch(/text\/html/);
      expect(await res.text()).toBe(INDEX_HTML);
    });

    it('falls back to index.html for top-level unknown paths', async () => {
      const res = await fetch(`${context!.baseUrl}/projects`);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe(INDEX_HTML);
    });

    it('falls back to index.html for deep paths with query strings', async () => {
      const res = await fetch(
        `${context!.baseUrl}/projects/my-project?tab=orders`
      );
      expect(res.status).toBe(200);
      expect(await res.text()).toBe(INDEX_HTML);
    });
  });

  // --- favicon rewrite -----------------------------------------------------
  // Intent: present since #1787. Browsers request `/favicon.ico` by default,
  // but MC apps ship `favicon.png`. The rewrite absorbs any `/favicon*`
  // variant (e.g. `favicon-32x32.png`) into the single PNG.

  describe('favicon rewrite', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'https://mc.example.com');
    });

    it('rewrites /favicon.ico to /favicon.png', async () => {
      const res = await fetch(`${context!.baseUrl}/favicon.ico`);
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toBe('image/png');
      expect(Buffer.from(await res.arrayBuffer())).toEqual(FAVICON_PNG);
    });

    it('rewrites arbitrary /favicon* paths to /favicon.png', async () => {
      const res = await fetch(`${context!.baseUrl}/favicon-32x32.png`);
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toBe('image/png');
      expect(Buffer.from(await res.arrayBuffer())).toEqual(FAVICON_PNG);
    });
  });

  // --- SPA glob exclusion invariant ----------------------------------------
  // Intent: serve-handler rewrites don't short-circuit on first match
  // (vercel/serve-handler#71), so the SPA rewrite's glob explicitly excludes
  // `favicon|login|logout`. These tests pin the exclusion — without it,
  // `/favicon.ico` and the auth paths would be served as `index.html`,
  // silently breaking downstream auth flows and favicon rendering.

  describe('SPA glob does not swallow exempt paths', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'https://mc.example.com');
    });

    it('serves favicon bytes for /favicon.ico (not the SPA)', async () => {
      const res = await fetch(`${context!.baseUrl}/favicon.ico`);
      expect(res.headers.get('content-type')).toBe('image/png');
      expect(await res.text()).not.toContain('<!doctype html>');
    });

    it('does not serve the SPA for /login (bare path)', async () => {
      // Non-localhost mcApiUrl: no inline handler triggers, and SPA glob
      // excludes `/login*`. Result: 404, not index.html.
      const res = await fetch(`${context!.baseUrl}/login`);
      expect(res.status).toBe(404);
    });

    it('does not serve the SPA for /logout (bare path)', async () => {
      const res = await fetch(`${context!.baseUrl}/logout`);
      expect(res.status).toBe(404);
    });
  });

  // --- localhost auth interception (#3734) ---------------------------------
  // Intent: when MC_API_URL points at a local proxy (http://localhost:*),
  // replace the absent login/logout UI with inline responses so the app
  // can be exercised end-to-end locally without a real MC backend.

  describe('localhost auth interception', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'http://localhost:8080');
    });

    it('redirects /login/authorize (301) to mcApiUrl, preserving path and query', async () => {
      const res = await fetch(
        `${context!.baseUrl}/login/authorize?foo=bar&baz=qux`,
        { redirect: 'manual' }
      );
      expect(res.status).toBe(301);
      expect(res.headers.get('location')).toBe(
        'http://localhost:8080/login/authorize?foo=bar&baz=qux'
      );
    });

    it('redirects /login/authorize without query string', async () => {
      const res = await fetch(`${context!.baseUrl}/login/authorize`, {
        redirect: 'manual',
      });
      expect(res.status).toBe(301);
      expect(res.headers.get('location')).toBe(
        'http://localhost:8080/login/authorize'
      );
    });

    it('redirects any path under /login/authorize/* (startsWith match)', async () => {
      const res = await fetch(`${context!.baseUrl}/login/authorize/callback`, {
        redirect: 'manual',
      });
      expect(res.status).toBe(301);
      expect(res.headers.get('location')).toBe(
        'http://localhost:8080/login/authorize/callback'
      );
    });

    it('redirects regardless of HTTP method (no method check in the branch)', async () => {
      const res = await fetch(`${context!.baseUrl}/login/authorize`, {
        method: 'POST',
        redirect: 'manual',
      });
      expect(res.status).toBe(301);
    });

    it('responds to /logout with a clear-session message', async () => {
      const res = await fetch(`${context!.baseUrl}/logout`);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe('Please clear your session storage.');
    });

    it('matches any path under /logout* (startsWith match)', async () => {
      const res = await fetch(`${context!.baseUrl}/logout/everything`);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe('Please clear your session storage.');
    });

    it('does NOT intercept /login (bare) — only /login/authorize', async () => {
      // The inline handler uses `startsWith('/login/authorize')`, so `/login`
      // alone (or `/login/foo`) falls through to serve-handler. The SPA glob
      // then excludes it → 404. This pins the exact trigger shape so the
      // rewrite keeps the same sensitivity.
      const res = await fetch(`${context!.baseUrl}/login`);
      expect(res.status).toBe(404);
    });
  });

  // --- non-localhost auth routes -------------------------------------------
  // Intent: the inline handlers are intentionally gated behind a localhost
  // mcApiUrl check (#3734). With any remote mcApiUrl, these paths should
  // NOT be intercepted — the real MC proxy is expected to handle them.

  describe('non-localhost auth routes', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'https://mc.example.com');
    });

    // Current observable contract: 404 (not SPA fallback, not redirect).
    // This is a leftover from pre-#3734 when `/login` / `/logout` mapped to
    // dedicated static HTML files. Those files are gone but the SPA glob
    // still excludes these paths. A future rewrite may consciously change
    // this to SPA fallback — these assertions will fail first and force an
    // intentional decision.
    it('returns 404 for /login/authorize (no redirect, no SPA fallback)', async () => {
      const res = await fetch(`${context!.baseUrl}/login/authorize?foo=bar`, {
        redirect: 'manual',
      });
      expect(res.status).toBe(404);
    });

    it('returns 404 for /logout (no SPA fallback)', async () => {
      const res = await fetch(`${context!.baseUrl}/logout`);
      expect(res.status).toBe(404);
    });
  });

  // --- handleAuthRoutes opt-in --------------------------------------------
  // Intent: applications that own the `/login*` / `/logout*` route shape
  // themselves (e.g. `application-authentication`) need the static server
  // to stop intercepting those paths so the SPA fallback can handle them.
  // Setting `handleAuthRoutes: true` (CLI: `--handle-auth-routes`) disables
  // all three auth-route branches as a bundle, regardless of whether
  // `mcApiUrl` is localhost. The favicon rewrite is unaffected.

  describe('with handleAuthRoutes enabled (localhost mcApiUrl)', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'http://localhost:8080', {
        handleAuthRoutes: true,
      });
    });

    it('falls through /login/authorize to the SPA instead of redirecting', async () => {
      const res = await fetch(
        `${context!.baseUrl}/login/authorize?foo=bar&baz=qux`,
        { redirect: 'manual' }
      );
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toMatch(/text\/html/);
      expect(await res.text()).toBe(INDEX_HTML);
    });

    it('falls through /logout to the SPA instead of returning the clear-session text', async () => {
      const res = await fetch(`${context!.baseUrl}/logout`);
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toMatch(/text\/html/);
      expect(await res.text()).toBe(INDEX_HTML);
    });

    it('falls through bare /login to the SPA instead of returning 404', async () => {
      const res = await fetch(`${context!.baseUrl}/login`);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe(INDEX_HTML);
    });

    it('still rewrites /favicon.ico to /favicon.png', async () => {
      const res = await fetch(`${context!.baseUrl}/favicon.ico`);
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toBe('image/png');
      expect(Buffer.from(await res.arrayBuffer())).toEqual(FAVICON_PNG);
    });
  });

  describe('with handleAuthRoutes enabled (non-localhost mcApiUrl)', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'https://mc.example.com', {
        handleAuthRoutes: true,
      });
    });

    it('falls through /login/authorize to the SPA instead of returning 404', async () => {
      const res = await fetch(`${context!.baseUrl}/login/authorize?foo=bar`, {
        redirect: 'manual',
      });
      expect(res.status).toBe(200);
      expect(await res.text()).toBe(INDEX_HTML);
    });

    it('falls through /logout to the SPA instead of returning 404', async () => {
      const res = await fetch(`${context!.baseUrl}/logout`);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe(INDEX_HTML);
    });
  });
});
