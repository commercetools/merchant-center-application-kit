const fs = require('fs');
const path = require('path');

// Resolve the absolute path of the caller location. This is necessary
// to point to files within that folder.
const sourcePath = process.cwd();

module.exports = configName => {
  // Attempt to read the JSON file provided by each application
  const rawConfig = fs.readFileSync(path.join(sourcePath, configName), {
    encoding: 'utf8',
  });
  const config = JSON.parse(rawConfig);

  // List the required fields in order to validate them
  const requiredKeys = [
    'frontendHost',
    'mcApiUrl',
    'location',
    'env',
    'cdnUrl',
  ];
  requiredKeys.forEach(key => {
    const value = config[key];
    if (!value)
      throw new Error(
        `Missing '${key}' required configuration field. ${rawConfig}`
      );
  });
};
