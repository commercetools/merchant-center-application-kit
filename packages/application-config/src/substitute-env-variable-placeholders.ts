/**
 * NOTE:
 *  Allows env variable placeholders e.g. `${env:MC_API_URL}`.
 *  Other placeholder types might be supported in the future.
 */
const variableSyntax = /\${([ ~:a-zA-Z0-9._\'",\-\/\(\)]+?)}/g;
const envRefSyntax = /^env:/g;

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

const substituteEnvVariablePlaceholder = (
  valueOfPlaceholder: string,
  matchedString: string,
  valueOfEnvConfig: string,
  meta: { processEnv: NodeJS.ProcessEnv } = { processEnv: process.env }
) => {
  const [, requestedEnvVar] = valueOfPlaceholder.split(':');
  const valueOfEnv = meta.processEnv[requestedEnvVar];

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

const substituteEnvVariablePlaceholders = <T>(
  config: T,
  meta: { processEnv: NodeJS.ProcessEnv } = { processEnv: process.env }
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
              meta
            );
          }
        });
      }
    }
    return substitutedValue;
  });

export default substituteEnvVariablePlaceholders;
