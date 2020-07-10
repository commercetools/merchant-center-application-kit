import type { Scalar, JSONConfig } from './types';

const isScalarList = (value: Scalar[] | JSONConfig[]): value is Scalar[] =>
  (value as Scalar[]).every((val) =>
    ['number', 'boolean', 'string'].includes(typeof val)
  );

/**
 * NOTE:
 *  Allows env variable placeholders e.g. `${env:MC_API_URL}`.
 *  Other placeholder types might be supported in the future.
 */
const variableSyntax = /\${([ ~:a-zA-Z0-9._\'",\-\/\(\)]+?)}/g;
const envRefSyntax = /^env:/g;

const hasVariablePlaceholder = (valueOfEnvConfig: Scalar | JSONConfig) =>
  typeof valueOfEnvConfig === 'string' &&
  // Using `{regex}.test()` might cause false positives if called multiple
  // times on a global regular expression:
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  //    As with exec() (or in combination with it), test() called multiple times
  //    on the same global regular expression instance will advance past the previous match.
  Boolean(valueOfEnvConfig.match(variableSyntax));

const isEnvVariablePlaceholder = (valueOfPlaceholder: string) =>
  Boolean(valueOfPlaceholder.match(envRefSyntax));

const substituteEnvVariablePlaceholder = (
  valueOfPlaceholder: string,
  matchedString: string,
  valueOfEnvConfig: string
) => {
  const [, requestedEnvVar] = valueOfPlaceholder.split(':');
  const valueOfEnv = process.env[requestedEnvVar];

  if (!valueOfEnv) {
    throw new Error(
      `Missing '${requestedEnvVar}' specified in config as 'env:${requestedEnvVar}'.`
    );
  }

  const escapedMatchedString = matchedString.replace(/[${}:]/g, '\\$&');
  return valueOfEnvConfig.replace(
    new RegExp(`(${escapedMatchedString})+`, 'g'),
    valueOfEnv
  );
};

const getValueOfPlaceholder = (valueWithPlaceholder: string) =>
  valueWithPlaceholder
    .replace(variableSyntax, (_match, varName) => varName.trim())
    .replace(/\s/g, '');

const substitutePlaceholders = (valueOfEnvConfig: Scalar | JSONConfig) => {
  if (!hasVariablePlaceholder(valueOfEnvConfig)) return valueOfEnvConfig;

  // Only strings are allowed
  const valueOfEnvConfigAsString = valueOfEnvConfig as string;
  // NOTE: Interseting into the string with placeholders
  // values one by one.
  let populatedValueOfEnvConfig = valueOfEnvConfigAsString;

  const matchResult = valueOfEnvConfigAsString.match(variableSyntax);

  if (matchResult) {
    matchResult.forEach((matchedString) => {
      const valueOfPlaceholder = getValueOfPlaceholder(matchedString);

      if (isEnvVariablePlaceholder(valueOfPlaceholder)) {
        populatedValueOfEnvConfig = substituteEnvVariablePlaceholder(
          valueOfPlaceholder,
          matchedString,
          populatedValueOfEnvConfig
        );
      }
    });
  }

  return populatedValueOfEnvConfig;
};

const substituteEnvVariablePlaceholders = <T>(config: T): T => {
  const configAsJson = ((config as unknown) as JSONConfig) ?? {};
  const entriesOfEnvConfig = Object.entries(configAsJson);

  const replacedEntriesOfEnvConfig = entriesOfEnvConfig.map(
    ([envConfigKey, envConfigValue]) => {
      if (Array.isArray(envConfigValue)) {
        if (isScalarList(envConfigValue)) {
          return [envConfigKey, envConfigValue.map(substitutePlaceholders)];
        }
        return [
          envConfigKey,
          envConfigValue.map(substituteEnvVariablePlaceholders),
        ];
      }
      if (typeof envConfigValue === 'object') {
        return [
          envConfigKey,
          substituteEnvVariablePlaceholders(envConfigValue),
        ];
      }
      return [envConfigKey, substitutePlaceholders(envConfigValue)];
    }
  );

  return Object.fromEntries(replacedEntriesOfEnvConfig);
};

export default substituteEnvVariablePlaceholders;
