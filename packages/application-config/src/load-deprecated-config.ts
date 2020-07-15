import type { CspDirective } from './schema';
import type { ApplicationConfig } from './types';

import fs from 'fs';
import substituteEnvVariablePlaceholders from './substitute-env-variable-placeholders';
import { parseJsonFile } from './utils';

export type DeprecatedOptions = {
  envPath: string;
  headersPath: string;
  cspPath?: string;
};

// List the required fields of `env.json`
const requiredEnvJsonFields = [
  'applicationName',
  'frontendHost',
  'mcApiUrl',
  'location',
  'env',
  'cdnUrl',
];

// For backwards compatibility, we still support the `env.json` and `headers.json` files.
// TODO: remove in `v17`.
const loadDeprecatedConfig = (
  options: DeprecatedOptions
): ApplicationConfig | undefined => {
  const hasEnvJson = fs.existsSync(options.envPath);
  const hasHeadersJson = fs.existsSync(options.headersPath);
  const hasCspJson = Boolean(options.cspPath && fs.existsSync(options.cspPath));
  const shouldUseDeprecatedCspJson = hasCspJson && !hasHeadersJson;

  if (!hasEnvJson) return;

  const loadedEnvJson = parseJsonFile<ApplicationConfig['env']>(
    options.envPath
  );
  // Validate required fields
  requiredEnvJsonFields.forEach((key) => {
    const hasKey = Object.prototype.hasOwnProperty.call(loadedEnvJson, key);
    if (!hasKey) {
      throw new Error(
        `Missing '${key}' required configuration field. ${loadedEnvJson}`
      );
    }
  });
  const env = substituteEnvVariablePlaceholders(loadedEnvJson);

  // Parse headers from `headers.json` (or the already deprecated `csp.json`).
  if (shouldUseDeprecatedCspJson) {
    const loadedCspJson = parseJsonFile<{
      'connect-src': CspDirective;
      'font-src'?: CspDirective;
      'img-src'?: CspDirective;
      'script-src'?: CspDirective;
      'style-src'?: CspDirective;
    }>(options.cspPath as string);
    const cspHeaders = substituteEnvVariablePlaceholders(loadedCspJson);
    return { env, headers: { csp: cspHeaders } };
  }

  const loadedHeadersJson = parseJsonFile<ApplicationConfig['headers']>(
    options.headersPath
  );
  const headers = substituteEnvVariablePlaceholders(loadedHeadersJson);
  return { env, headers };
};

export default loadDeprecatedConfig;
