const { Headers } = require('node-fetch');
const colors = require('colors/safe');
const MutationObserver = require('@sheerun/mutationobserver-shim');
const loadConfig = require('./load-config');

const jestConfig = loadConfig();

global.window.app = {
  applicationName: 'my-app',
  mcApiUrl: 'http://localhost:8080',
};

window.MutationObserver = MutationObserver;
global.Headers = global.Headers || Headers;

const shouldSilenceWarnings = (...messages) =>
  jestConfig.silenceConsoleWarnings.some((msgRegex) =>
    messages.some((msg) => msgRegex.test(msg))
  );

const shouldNotThrowWarnings = (...messages) =>
  jestConfig.notThrowWarnings.some((msgRegex) =>
    messages.some((msg) => msgRegex.test(msg))
  );

// setup file
const logOrThrow = (log, method, messages) => {
  const warning = `console.${method} calls not allowed in tests`;
  if (process.env.CI) {
    if (shouldSilenceWarnings(messages)) return;

    log(warning, '\n', ...messages);

    // NOTE: That some warnings should be logged allowing us to refactor graceully
    // without having to introduce a breaking change.
    if (shouldNotThrowWarnings(messages)) return;

    throw new Error(...messages);
  } else {
    log(colors.bgYellow.black(' WARN '), warning, '\n', ...messages);
  }
};

// eslint-disable-next-line no-console
const logMessage = console.log;
global.console.log = (...messages) => {
  logOrThrow(logMessage, 'log', messages);
};

// eslint-disable-next-line no-console
const logInfo = console.info;
global.console.info = (...messages) => {
  logOrThrow(logInfo, 'info', messages);
};

// eslint-disable-next-line no-console
const logWarning = console.warn;
global.console.warn = (...messages) => {
  logOrThrow(logWarning, 'warn', messages);
};

// eslint-disable-next-line no-console
const logError = console.error;
global.console.error = (...messages) => {
  logOrThrow(logError, 'error', messages);
};
