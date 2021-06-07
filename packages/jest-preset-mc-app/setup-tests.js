const fs = require('fs');
const { Headers } = require('node-fetch');
const path = require('path');
const colors = require('colors/safe');
const pkgDir = require('pkg-dir');
const MutationObserver = require('@sheerun/mutationobserver-shim');
const loadConfig = require('./load-config');

const jestConfig = loadConfig();

global.window.app = {
  applicationName: 'my-app',
  mcApiUrl: 'http://localhost:8080',
};

window.MutationObserver = MutationObserver;
global.Headers = global.Headers || Headers;

let additionalSilencedWarnings = [];
let additionalNonThrowingWarnings = [];

function hasMatchingRegexForMessage(messages, msgRegExps) {
  return msgRegExps.some((msgRegex) =>
    messages.some((msg) => msgRegex.test(msg))
  );
}

function shouldSilenceWarnings(...messages) {
  const silencedByJestConfig = hasMatchingRegexForMessage(
    messages,
    jestConfig.silenceConsoleWarnings
  );
  const additionallySilenced = hasMatchingRegexForMessage(
    messages,
    additionalSilencedWarnings
  );

  return silencedByJestConfig || additionallySilenced;
}

function shouldNotThrowWarnings(...messages) {
  const notThrowingByJestConfig = hasMatchingRegexForMessage(
    messages,
    jestConfig.notThrowWarnings
  );
  const additionallyNonThrowing = hasMatchingRegexForMessage(
    messages,
    additionalNonThrowingWarnings
  );

  return notThrowingByJestConfig || additionallyNonThrowing;
}

// setup file
function logOrThrow(log, method, messages) {
  let warning = `@commercetools-frontend/jest-preset-mc-app: console.${method} calls should not be used in tests.`;
  if (process.env.CI) {
    if (shouldSilenceWarnings(messages)) return;

    log(warning, '\n', ...messages);

    // NOTE: That some warnings should be logged allowing us to refactor graceully
    // without having to introduce a breaking change.
    if (shouldNotThrowWarnings(messages)) return;

    warning = `@commercetools-frontend/jest-preset-mc-app: console.${method} calls not allowed in tests.`;

    throw new Error(...messages);
  } else {
    log(colors.bgYellow.black(' WARN '), warning, '\n', ...messages);
  }
}

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

global.console.config = {};

global.console.config.addSilencedWarning = (rexExp) =>
  additionalSilencedWarnings.push(rexExp);
global.console.config.addNonThrowingWarning = (rexExp) =>
  additionalNonThrowingWarnings.push(rexExp);
