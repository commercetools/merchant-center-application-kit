import crypto from 'crypto';
import type { Plugin } from 'vite';
import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import { generateTemplate } from '@commercetools-frontend/mc-html-template';
import pluginCustomApplication from './vite-plugin-merchant-center-customization';

const sha256 = (value: string) =>
  `sha256-${crypto.createHash('sha256').update(value).digest('base64')}`;

const applicationConfig = {
  env: {
    applicationId: 'app-id',
    applicationName: 'my-app',
    entryPointUriPath: 'my-app',
    frontendHost: 'localhost:3001',
    mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
    location: 'gcp-eu',
    // Not 'development': `processHeaders` replaces the script hashes with
    // `'unsafe-inline'` for that value, so no hash exists to mismatch. The
    // divergence only bites the prod-local dev-server path, which serves a
    // production-shaped config from `start:prod:local`.
    env: 'production',
    cdnUrl: 'http://localhost:3001',
    servedByProxy: false,
    revision: '',
  },
  headers: {},
} as unknown as ApplicationRuntimeConfig;

const transform = (plugin: Plugin, html: string) => {
  const hook = plugin.transformIndexHtml;
  if (typeof hook !== 'function') {
    throw new Error('transformIndexHtml is not a function');
  }
  return (
    hook as unknown as (this: unknown, h: string, c: unknown) => string
  ).call({}, html, {});
};

// The real template, so the placeholders `replaceHtmlPlaceholders` looks for
// (`__CSP__`, `__APPLICATION_ENVIRONMENT__`) are actually present.
const rawHtml = generateTemplate({
  cssImports: ['<link rel="stylesheet" href="app-shell.css">'],
  scriptImports: ['<script type="module" src="/index.js" defer></script>'],
});

const getInjectedEnvScript = (html: string) => {
  const match = /<script>(window\.app = [^<]*?)<\/script>/.exec(html);
  if (!match) throw new Error(`No inline env script found in: ${html}`);
  return match[1];
};

const getScriptSrcHashes = (html: string) => {
  const csp =
    /Content-Security-Policy[^>]*?content="([^"]*)"/.exec(html)?.[1] ?? '';
  const scriptSrc = /script-src ([^;]*)/.exec(csp)?.[1] ?? '';
  return (
    scriptSrc
      .match(/&#x27;sha256-[^&]*&#x27;|'sha256-[^']*'/g)
      ?.map((h) => h.replace(/&#x27;|'/g, '')) ?? []
  );
};

describe('vite-plugin-merchant-center-customization', () => {
  const originalMcApiUrl = process.env.MC_API_URL;

  afterEach(() => {
    if (originalMcApiUrl === undefined) {
      delete process.env.MC_API_URL;
    } else {
      process.env.MC_API_URL = originalMcApiUrl;
    }
  });

  it('allows the injected env script with no MC_API_URL override', () => {
    delete process.env.MC_API_URL;
    const html = transform(pluginCustomApplication(applicationConfig), rawHtml);

    expect(getScriptSrcHashes(html)).toContain(
      sha256(getInjectedEnvScript(html))
    );
  });

  // The dev server overrides `mcApiUrl` from `MC_API_URL` before injecting,
  // so hashing the unmodified `applicationConfig` produced a `script-src`
  // entry for a script that was never served. CSP then blocked the only
  // script defining `window.app`.
  it('allows the injected env script when MC_API_URL overrides mcApiUrl', () => {
    process.env.MC_API_URL = 'http://localhost:8080';
    const html = transform(pluginCustomApplication(applicationConfig), rawHtml);

    // `sanitizeAppEnvironment` escapes the slashes, so match its output.
    expect(getInjectedEnvScript(html)).toContain('localhost:8080');
    expect(getScriptSrcHashes(html)).toContain(
      sha256(getInjectedEnvScript(html))
    );
  });
});
