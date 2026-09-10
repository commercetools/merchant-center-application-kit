import crypto from 'crypto';
import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import processHeaders from './process-headers';
import replaceHtmlPlaceholders from './replace-html-placeholders';

/**
 * The inline script that defines `window.app` is allowed by a SHA-256 hash in
 * `script-src`. `processHeaders` computes that hash and
 * `replaceHtmlPlaceholders` injects the script; if the two ever compose
 * different bytes, the browser blocks the script and the app boots with no
 * environment. Nothing else in the suite would catch it, because each side is
 * self-consistent.
 */
const applicationConfig = {
  data: {
    id: 'app-id-123',
    name: 'avengers-app',
    description: undefined,
    entryPointUriPath: 'avengers',
    url: 'https://avengers.app',
    permissions: [],
    icon: '<svg><path fill="#000000" /></svg>',
    mainMenuLink: {
      defaultLabel: 'Avengers',
      labelAllLocales: [],
      permissions: [],
    },
    submenuLinks: [],
  },
  env: {
    applicationId: '__local:avengers',
    applicationIdentifier: '__local:avengers',
    applicationName: 'avengers-app',
    entryPointUriPath: 'avengers',
    cdnUrl: 'http://localhost:3001/',
    env: 'production',
    frontendHost: 'localhost:3001',
    location: 'gcp-eu',
    mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
    revision: '',
    servedByProxy: false,
  },
  headers: {},
} as unknown as ApplicationRuntimeConfig;

const sha256 = (content: string) =>
  `sha256-${crypto.createHash('sha256').update(content).digest('base64')}`;

const getInjectedEnvironmentScript = (config: ApplicationRuntimeConfig) => {
  const html = replaceHtmlPlaceholders('__APPLICATION_ENVIRONMENT__', {
    env: config.env,
  });
  const match = /^<script>([\s\S]*)<\/script>$/.exec(html);
  if (!match) {
    throw new Error(`Expected a single inline script, got: ${html}`);
  }
  return match[1];
};

const getScriptSrcHashes = (config: ApplicationRuntimeConfig) => {
  const csp = processHeaders(config)['Content-Security-Policy'] ?? '';
  const scriptSrc = /script-src ([^;]*)/.exec(csp)?.[1] ?? '';
  return scriptSrc.match(/'sha256-[^']*'/g)?.map((h) => h.slice(1, -1)) ?? [];
};

describe.each([
  ['without a build fingerprint', undefined],
  ['with a build fingerprint', 'abc123def456'],
])('CSP hash agreement %s', (_label, buildFingerprint) => {
  const config = {
    ...applicationConfig,
    env: { ...applicationConfig.env, buildFingerprint },
  } as ApplicationRuntimeConfig;

  it('lists the hash of the script that actually gets injected', () => {
    expect(getScriptSrcHashes(config)).toContain(
      sha256(getInjectedEnvironmentScript(config))
    );
  });
});

describe('CSP hash agreement guard', () => {
  it('would notice a divergence between the two call sites', () => {
    // Proves the assertion above has teeth: hashing anything other than the
    // injected bytes must not appear in `script-src`.
    const injected = getInjectedEnvironmentScript(applicationConfig);
    expect(getScriptSrcHashes(applicationConfig)).not.toContain(
      sha256(`${injected} `)
    );
  });
});
