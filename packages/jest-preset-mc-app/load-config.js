const { cosmiconfigSync } = require('cosmiconfig');

const moduleName = 'jest-mc-app';
const explorer = cosmiconfigSync(moduleName);

const defaultConfig = {
  silenceConsoleWarnings: [
    /.*Warning: componentWillReceiveProps has been renamed.*/,
    /.*CellMeasurerCache should only measure a cell's width or height.*/,
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

const loadConfig = () => {
  const configFile = explorer.search();
  if (!configFile || configFile.isEmpty) {
    return defaultConfig;
  }
  const customConfig = configFile.config;
  return {
    ...defaultConfig,
    ...customConfig,
    ...mergeSilenceConsoleWarnings(customConfig),
    ...mergeNotThrowWarnings(customConfig),
  };
};

module.exports = loadConfig;

function createListMergerWithDefaults(key) {
  return (config) => ({
    [key]: defaultConfig[key].concat(config[config] || []),
  });
}
