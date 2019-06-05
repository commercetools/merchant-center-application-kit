const fs = require('fs');

// Keep a reference to the loaded config so that requiring the module
// again will result in returning the cached value.
let loadedEnv;

module.exports = configPath => {
  if (loadedEnv) return loadedEnv;

  // Attempt to read the JSON file provided by each application
  const rawConfig = fs.readFileSync(configPath, { encoding: 'utf8' });
  const config = JSON.parse(rawConfig);

  // List the required fields in order to validate them
  const requiredKeys = [
    // NOTE: for now we keep it optional, but eventually we want to enforce
    // this field to be required.
    // 'applicationName',
    'frontendHost',
    'mcApiUrl',
    'location',
    'env',
    'cdnUrl',
  ];
  requiredKeys.forEach(key => {
    const hasKey = Object.prototype.hasOwnProperty.call(config, key);
    if (!hasKey)
      throw new Error(
        `Missing '${key}' required configuration field. ${rawConfig}`
      );
  });

  // Default configuration containing optional fields
  const defaultConfig = {
    servedByProxy: false,
  };

  // eslint-disable-next-line prefer-object-spread/prefer-object-spread
  const mergedConfig = Object.assign({}, defaultConfig, config);
  loadedEnv = mergedConfig;
  return loadedEnv;
};
