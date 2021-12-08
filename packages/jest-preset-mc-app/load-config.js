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
    /.*util function is now deprecated and has been moved to Jest repository.*/,
  ],
  notThrowWarnings: [
    /.*@commercetools-frontend\/permissions.*/,
    /.*Warning: React.createFactory() is deprecated.*/,
  ],
  babelConfig: {
    // Some environemnts do not require `core-js` and can hence disable
    // it explicitely. This will disable `core-js` for `preset-env` and the
    // `plugin-transform-runtime`.
    disableCoreJs: false,
  },
  rtlConfig: {},
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
