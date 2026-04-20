/**
 * Integration tests for the `mc-scripts serve` command.
 *
 * These tests describe the observable HTTP behavior of the serve command —
 * they are intentionally agnostic of the underlying implementation (currently
 * `serve-handler`) so the same suite can validate future reimplementations
 * (e.g. Vite's preview server).
 *
 * The server binds to an ephemeral port (`port: 0`) and is torn down after
 * every test; fixtures live in a temp directory.
 *
 * @jest-environment node
 */

import fs from 'fs';
import type http from 'http';
import os from 'os';
import path from 'path';
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

const createFixture = (): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-scripts-serve-'));
  fs.writeFileSync(path.join(dir, 'index.html'), INDEX_HTML);
  fs.writeFileSync(path.join(dir, 'favicon.png'), FAVICON_PNG);
  fs.mkdirSync(path.join(dir, 'assets'));
  fs.writeFileSync(path.join(dir, 'assets', 'app.js'), ASSET_JS);
  return dir;
};

const startServer = async (
  publicPath: string,
  mcApiUrl: string
): Promise<ServerContext> => {
  const applicationConfig = {
    env: { mcApiUrl },
  } as unknown as ApplicationRuntimeConfig;

  const server = await run({ port: 0, publicPath, applicationConfig });
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
    fixtureDir = createFixture();
  });

  afterEach(async () => {
    await stopServer(context);
    context = undefined;
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  });

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
  });

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

  describe('localhost auth interception', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'http://localhost:8080');
    });

    it('redirects /login/authorize (301) to the configured mcApiUrl, preserving the path and query', async () => {
      const res = await fetch(
        `${context!.baseUrl}/login/authorize?foo=bar&baz=qux`,
        { redirect: 'manual' }
      );
      expect(res.status).toBe(301);
      expect(res.headers.get('location')).toBe(
        'http://localhost:8080/login/authorize?foo=bar&baz=qux'
      );
    });

    it('responds to /logout with a clear-session message', async () => {
      const res = await fetch(`${context!.baseUrl}/logout`);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe('Please clear your session storage.');
    });
  });

  describe('non-localhost auth routes', () => {
    beforeEach(async () => {
      context = await startServer(fixtureDir, 'https://mc.example.com');
    });

    // The SPA fallback glob explicitly excludes `/login*` and `/logout*` —
    // these paths were historically served via dedicated `login.html` /
    // `logout.html` files (removed in PR #3734). With no matching file and no
    // SPA fallback, `serve-handler` returns 404. This pins the current
    // observable behavior; future implementations that choose to fall through
    // to the SPA must update these assertions deliberately.
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
});
