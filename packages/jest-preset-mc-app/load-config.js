const { cosmiconfigSync } = require('cosmiconfig');

const moduleName = 'jest-preset-mc-app';
const explorer = cosmiconfigSync(moduleName, {
  searchStrategy: 'project',
});

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
    /.*"importFrom" and "exportTo" will be removed in a future version of postcss-custom-properties.*/,
    /.*Browserslist: caniuse-lite is outdated.*/,
    /.*Browserslist: browsers data \(caniuse-lite\) is \d+ months old.*/,
    // @apollo/client v3.14 deprecated `onCompleted`/`onError` on `useQuery`
    // (recommends deriving state from `data`/`error` in a `useEffect`
    // instead). Silenced pending a migration of existing `onCompleted`/
    // `onError` usages (e.g. `am-i-logged-in.tsx`); the options still work.
    /.*go\.apollo\.dev\/c\/err#.*(onCompleted|onError).*/,
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
