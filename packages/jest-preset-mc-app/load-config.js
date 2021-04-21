const { cosmiconfigSync } = require('cosmiconfig');

const moduleName = 'jest-preset-mc-app';
const explorer = cosmiconfigSync(moduleName);

function createListMergerWithDefaults(key) {
  return (config) => ({
    [key]: defaultConfig[key].concat(config[key] || []),
  });
}

const defaultConfig = {
  silenceConsoleWarnings: [
    /.*Warning: componentWillReceiveProps has been renamed.*/,
    /.*CellMeasurerCache should only measure a cell's width or height.*/,
    /.*\[React Intl\] "defaultRichTextElements" was specified but "message" was not pre-compiled.*/,
  ],
  notThrowWarnings: [
    /.*@commercetools-frontend\/permissions.*/,
    /.*Warning: React.createFactory() is deprecated.*/,
  ],
};

const mergeSilenceConsoleWarnings = createListMergerWithDefaults(
  'silenceConsoleWarnings'
);
const mergeNotThrowWarnings = createListMergerWithDefaults('notThrowWarnings');

let cachedConfig;
const loadConfig = () => {
  if (cachedConfig) {
    return cachedConfig;
  }
  const configFile = explorer.search();
  if (configFile && configFile.config) {
    const customConfig = configFile.config;
    cachedConfig = {
      ...defaultConfig,
      ...customConfig,
      ...mergeSilenceConsoleWarnings(customConfig),
      ...mergeNotThrowWarnings(customConfig),
    };
  } else {
    cachedConfig = defaultConfig;
  }
  return cachedConfig;
};

module.exports = loadConfig;
