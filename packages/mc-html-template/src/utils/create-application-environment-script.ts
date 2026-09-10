import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';
import sanitizeAppEnvironment from './sanitize-app-environment';

/**
 * Composes the body of the inline script that publishes the application
 * environment to the client.
 *
 * This exists so `process-headers` and `replace-html-placeholders` cannot
 * disagree. The script is allowed by a SHA-256 hash in `script-src`, and that
 * hash is computed over the very bytes this returns. Composing the body in
 * both places instead -- which is what they did before -- means any edit has
 * to land in both, and a miss silently CSP-blocks the only script that defines
 * `window.app`.
 */
const createApplicationEnvironmentScript = (
  env: ApplicationRuntimeConfig['env']
) => {
  return `window.app = ${sanitizeAppEnvironment(env)};`;
};

export default createApplicationEnvironmentScript;
