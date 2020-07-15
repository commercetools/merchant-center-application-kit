import type { ApplicationConfig } from './types';

import fs from 'fs';
import substituteEnvVariablePlaceholders from './substitute-env-variable-placeholders';

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

const parseJsonFile = (filePath: string) => {
  let rawData;
  try {
    rawData = fs.readFileSync(filePath, {
      encoding: 'utf8',
    });
  } catch (error) {
    // Ignore
  }
  return rawData ? JSON.parse(rawData) : {};
};

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

  const loadedEnvJson = parseJsonFile(options.envPath);
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
  const loadedHeadersOrCspJson = shouldUseDeprecatedCspJson
    ? parseJsonFile(options.cspPath as string)
    : parseJsonFile(options.headersPath);
  const headers = substituteEnvVariablePlaceholders(loadedHeadersOrCspJson);

  return { env, headers };
};

export default loadDeprecatedConfig;
