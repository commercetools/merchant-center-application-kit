const fs = require('fs');
const substituteEnvVariablePlaceholders = require('./utils/substitute-env-variable-placeholders');

// Keep a reference to the loaded config so that requiring the module
// again will result in returning the cached value.
let loadedEnv;

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
  requiredKeys.forEach((key) => {
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
