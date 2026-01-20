import fs from 'node:fs';
import path from 'path';
import type { LoadingConfigOptions } from './types';

type TMessageKeyValue = string;
// Transifex's Structured JSON format.
// https://help.transifex.com/en/articles/6220899-structured-json
type TMessageStructuredJson = {
  string: string;
  // ...
};
type TMessage = Record<string, TMessageKeyValue | TMessageStructuredJson>;

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

// Safe regex pattern escaping function
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

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

const isStructuredJson = (
  message: TMessageKeyValue | TMessageStructuredJson
): message is TMessageStructuredJson =>
  (message as TMessageStructuredJson)?.string !== undefined;

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

  return valueOfEnvConfig.replace(
    new RegExp(escapeRegExp(matchedString), 'g'),
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
  const translations: TMessage = require(translationsFilePath);

  const hasIntlMessage = translations.hasOwnProperty(requestedIntlMessageId);

  if (!hasIntlMessage) {
    throw new Error(
      `Missing message key '${requestedIntlMessageId}' specified in config as 'intl:${locale}:${requestedIntlMessageId}'.`
    );
  }

  const translation = translations[requestedIntlMessageId];
  const translationValue = isStructuredJson(translation)
    ? translation.string
    : translation;

  return valueOfEnvConfig.replace(
    new RegExp(escapeRegExp(matchedString), 'g'),
    translationValue
  );
};

const substituteFilePathVariablePlaceholder = (
  valueOfPlaceholder: string,
  matchedString: string,
  valueOfEnvConfig: string,
  loadingOptions: LoadingConfigOptions
) => {
  const [, filePathOrModule] = valueOfPlaceholder.split(':');
  const resolvedPath = require.resolve(filePathOrModule, {
    paths: [loadingOptions.applicationPath],
  });

  // Security check: Prevent path traversal attacks.
  // require.resolve() already provides protection by only resolving modules
  // accessible from the applicationPath. However, we add an extra layer to
  // prevent access to sensitive system files outside the workspace.
  const normalizedPath = path.normalize(resolvedPath);
  const applicationPath = path.normalize(loadingOptions.applicationPath);

  // Find workspace root by traversing up from applicationPath until we find
  // package.json, pnpm-workspace.yaml, or reach root
  let workspaceRoot = applicationPath;
  let currentPath = applicationPath;
  const rootPath = path.parse(currentPath).root;

  while (currentPath !== rootPath) {
    const hasPackageJson = fs.existsSync(
      path.join(currentPath, 'package.json')
    );
    const hasWorkspaceConfig =
      fs.existsSync(path.join(currentPath, 'pnpm-workspace.yaml')) ||
      fs.existsSync(path.join(currentPath, 'lerna.json'));

    if (hasPackageJson) {
      workspaceRoot = currentPath;
      if (hasWorkspaceConfig) {
        // Found workspace root
        break;
      }
    }
    currentPath = path.dirname(currentPath);
  }

  const relativePath = path.relative(workspaceRoot, normalizedPath);

  // Path is safe if it's within the workspace root.
  // Use path.relative() to avoid string prefix vulnerabilities (e.g., "/app" vs "/app-evil")
  const isSafePath =
    !relativePath.startsWith('..') && !path.isAbsolute(relativePath);

  if (!isSafePath) {
    throw new Error(
      `Access to files outside workspace directory is not allowed: ${filePathOrModule}`
    );
  }
  const content = fs.readFileSync(normalizedPath, {
    encoding: 'utf-8',
  });

  return valueOfEnvConfig.replace(
    new RegExp(escapeRegExp(matchedString), 'g'),
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
): T => {
  const result = JSON.parse(JSON.stringify(config), (_key, value) => {
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
  return result;
};

export default substituteVariablePlaceholders;
