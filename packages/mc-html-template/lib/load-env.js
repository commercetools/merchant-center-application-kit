/* eslint-disable @typescript-eslint/explicit-function-return-type */
const fs = require('fs');
const replaceall = require('replaceall');

// Keep a reference to the loaded config so that requiring the module
// again will result in returning the cached value.
let loadedEnv;

/**
 * NOTE:
 *  Allows env variable placeholders e.g. `${env:MC_API_URL}`.
 *  Other placeholder types might be supported in the future.
 */
const variableSyntax = RegExp('\\${([ ~:a-zA-Z0-9._\'",\\-\\/\\(\\)]+?)}', 'g');
const envRefSyntax = RegExp(/^env:/g);

const hasVariablePlaceholder = valueOfEnvConfig =>
  typeof valueOfEnvConfig === 'string' &&
  variableSyntax.test(valueOfEnvConfig);
const isEnvVariablePlaceholder = valueOfPlaceholder =>
  envRefSyntax.test(valueOfPlaceholder);
const substituteEnvVariablePlaceholder = (
  valueOfPlaceholder,
  matchedString,
  valueOfEnvConfig
) => {
  const [,requestedEnvVar] = valueOfPlaceholder.split(':');
  const valueOfEnv = process.env[requestedEnvVar];

  if (!valueOfEnv) {
    throw new Error(
      `Missing '${requestedEnvVar}' specified in config as 'env:${requestedEnvVar}'.`
    );
  }

  const substitutedEnvConfig = replaceall(
    matchedString,
    valueOfEnv,
    valueOfEnvConfig
  );

  return substitutedEnvConfig;
};
const getValueOfPlaceholder = valueWithPlaceholder =>
  valueWithPlaceholder
    .replace(variableSyntax, (match, varName) => varName.trim())
    .replace(/\s/g, '');
const substitutePlaceholders = valueOfEnvConfig => {
  if (!hasVariablePlaceholder(valueOfEnvConfig)) return valueOfEnvConfig;

  // NOTE: Interseting into the string with placeholders
  // values one by one.
  let populatedValueOfEnvConfig = valueOfEnvConfig;

  valueOfEnvConfig.match(variableSyntax).forEach(matchedString => {
    const valueOfPlaceholder = getValueOfPlaceholder(matchedString);

    if (isEnvVariablePlaceholder(valueOfPlaceholder)) {
      populatedValueOfEnvConfig = substituteEnvVariablePlaceholder(
        valueOfPlaceholder,
        matchedString,
        populatedValueOfEnvConfig
      );
    }
  });

  return populatedValueOfEnvConfig;
};
const substituteEnvVariablePlaceholders = config => {
  const entriesOfEnvConfig = Object.entries(config);

  const replacedEntriesOfEnvConfig = entriesOfEnvConfig.map(
    ([envConfigKey, envConfigValue]) => [
      envConfigKey,
      substitutePlaceholders(envConfigValue),
    ]
  );

  return Object.fromEntries(replacedEntriesOfEnvConfig);
};

module.exports = (configPath, { disableCache } = { disableCache: false }) => {
  if (loadedEnv && !disableCache) return loadedEnv;

  // Attempt to read the JSON file provided by each application
  const rawConfig = fs.readFileSync(configPath, { encoding: 'utf8' });
  const config = JSON.parse(rawConfig);

  const substitutedConfig = substituteEnvVariablePlaceholders(config);

  // List the required fields in order to validate them
  const requiredKeys = [
    'applicationName',
    'frontendHost',
    'mcApiUrl',
    'location',
    'env',
    'cdnUrl',
  ];
  requiredKeys.forEach(key => {
    const hasKey = Object.prototype.hasOwnProperty.call(substitutedConfig, key);
    if (!hasKey) {
      throw new Error(
        `Missing '${key}' required configuration field. ${rawConfig}`
      );
    }
  });

  // Default configuration containing optional fields
  const defaultConfig = {
    servedByProxy: false,
  };

  // eslint-disable-next-line
  const mergedConfig = Object.assign({}, defaultConfig, substitutedConfig);

  loadedEnv = mergedConfig;

  return loadedEnv;
};
