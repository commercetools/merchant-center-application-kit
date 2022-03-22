import fs from 'fs';
import type { LoadingConfigOptions } from './types';

/**
 * NOTE:
 * Allows variable placeholders. Supported types are:
 * - `env`: For example `${env:MC_API_URL}`.
 * - `intl`: For example `${intl:en:Menu.title}`.
 * - `path`: For example `${path:./app.svg}`, or `${path:@commercetools-frontend/assets/application-icons/rocket.svg}`.
 */
const variableSyntax = /\${([ ~:\w.'",\-/()@]+?)}/g;
const envRefSyntax = /^env:/g;
const intlRefSyntax = /^intl:/g;
const filePathRefSyntax = /^path:/g;

const hasVariablePlaceholder = (valueOfEnvConfig: string) =>
  typeof valueOfEnvConfig === 'string' &&
  // Using `{regex}.test()` might cause false positives if called multiple
  // times on a global regular expression:
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  //    As with exec() (or in combination with it), test() called multiple times
  //    on the same global regular expression instance will advance past the previous match.
  Boolean(valueOfEnvConfig.match(variableSyntax));

const isEnvVariablePlaceholder = (valueOfPlaceholder: string) =>
  Boolean(valueOfPlaceholder.match(envRefSyntax));

const isIntlVariablePlaceholder = (valueOfPlaceholder: string) =>
  Boolean(valueOfPlaceholder.match(intlRefSyntax));

const isFilePathVariablePlaceholder = (valueOfPlaceholder: string) =>
  Boolean(valueOfPlaceholder.match(filePathRefSyntax));

const substituteEnvVariablePlaceholder = (
  valueOfPlaceholder: string,
  matchedString: string,
  valueOfEnvConfig: string,
  loadingOptions: LoadingConfigOptions
) => {
  const [, requestedEnvVar] = valueOfPlaceholder.split(':');
  const hasEnvField = loadingOptions.processEnv.hasOwnProperty(requestedEnvVar);

  if (!hasEnvField) {
    throw new Error(
      `Missing environment variable '${requestedEnvVar}' specified in config as 'env:${requestedEnvVar}'.`
    );
  }

  const escapedMatchedString = matchedString.replace(/[${}:]/g, '\\$&');
  return valueOfEnvConfig.replace(
    new RegExp(`(${escapedMatchedString})+`, 'g'),
    loadingOptions.processEnv[requestedEnvVar] as string
  );
};

const substituteIntlVariablePlaceholder = (
  valueOfPlaceholder: string,
  matchedString: string,
  valueOfEnvConfig: string,
  loadingOptions: LoadingConfigOptions
) => {
  const [, locale, requestedIntlMessageId] = valueOfPlaceholder.split(':');

  const translationsFilePath = require.resolve(`./i18n/data/${locale}.json`, {
    paths: [
      `${loadingOptions.applicationPath}/src`,
      loadingOptions.applicationPath,
    ],
  });
  const translations: Record<string, string> = require(translationsFilePath);

  const hasIntlMessage = translations.hasOwnProperty(requestedIntlMessageId);

  if (!hasIntlMessage) {
    throw new Error(
      `Missing message key '${requestedIntlMessageId}' specified in config as 'intl:${locale}:${requestedIntlMessageId}'.`
    );
  }

  const escapedMatchedString = matchedString.replace(/[${}:]/g, '\\$&');
  return valueOfEnvConfig.replace(
    new RegExp(`(${escapedMatchedString})+`, 'g'),
    translations[requestedIntlMessageId]
  );
};

const substituteFilePathVariablePlaceholder = (
  valueOfPlaceholder: string,
  matchedString: string,
  valueOfEnvConfig: string,
  loadingOptions: LoadingConfigOptions
) => {
  const [, filePathOrModule] = valueOfPlaceholder.split(':');

  const content = fs.readFileSync(
    require.resolve(filePathOrModule, {
      // Relative paths should be resolved from the application folder.
      paths: [loadingOptions.applicationPath],
    }),
    {
      encoding: 'utf-8',
    }
  );

  const escapedMatchedString = matchedString.replace(/[${}:]/g, '\\$&');
  return valueOfEnvConfig.replace(
    new RegExp(`(${escapedMatchedString})+`, 'g'),
    content
  );
};

const getValueOfPlaceholder = (valueWithPlaceholder: string) =>
  valueWithPlaceholder
    .replace(variableSyntax, (_match, varName) => varName.trim())
    .replace(/\s/g, '');

const substituteVariablePlaceholders = <T>(
  config: T,
  loadingOptions: LoadingConfigOptions
): T =>
  JSON.parse(JSON.stringify(config), (_key, value) => {
    // Only strings are allowed
    let substitutedValue = value as string;

    if (hasVariablePlaceholder(substitutedValue)) {
      const matchResult = substitutedValue.match(variableSyntax);
      if (matchResult) {
        matchResult.forEach((matchedString) => {
          const valueOfPlaceholder = getValueOfPlaceholder(matchedString);

          if (isEnvVariablePlaceholder(valueOfPlaceholder)) {
            substitutedValue = substituteEnvVariablePlaceholder(
              valueOfPlaceholder,
              matchedString,
              substitutedValue,
              loadingOptions
            );
          } else if (isIntlVariablePlaceholder(valueOfPlaceholder)) {
            substitutedValue = substituteIntlVariablePlaceholder(
              valueOfPlaceholder,
              matchedString,
              substitutedValue,
              loadingOptions
            );
          } else if (isFilePathVariablePlaceholder(valueOfPlaceholder)) {
            substitutedValue = substituteFilePathVariablePlaceholder(
              valueOfPlaceholder,
              matchedString,
              substitutedValue,
              loadingOptions
            );
          }
        });
      }
    }
    return substitutedValue;
  });

export default substituteVariablePlaceholders;
