require('setimmediate');
require('unfetch/polyfill');
require('@testing-library/jest-dom/extend-expect');
// Intl polyfills: https://formatjs.io/docs/polyfills
require('@formatjs/intl-getcanonicallocales');
require('@formatjs/intl-listformat');
require('@formatjs/intl-locale');
require('@formatjs/intl-numberformat');
require('@formatjs/intl-pluralrules');
// Intl polyfills locale data
require('@formatjs/intl-listformat/locale-data/en');
require('@formatjs/intl-listformat/locale-data/de');
require('@formatjs/intl-listformat/locale-data/es');
require('@formatjs/intl-listformat/locale-data/fr');
require('@formatjs/intl-numberformat/locale-data/en');
require('@formatjs/intl-numberformat/locale-data/de');
require('@formatjs/intl-numberformat/locale-data/es');
require('@formatjs/intl-numberformat/locale-data/fr');
require('@formatjs/intl-pluralrules/locale-data/en');
require('@formatjs/intl-pluralrules/locale-data/de');
require('@formatjs/intl-pluralrules/locale-data/es');
require('@formatjs/intl-pluralrules/locale-data/fr');

const { configure: configureRtl } = require('@testing-library/react');
const failOnConsole = require('./fail-on-console');
const loadConfig = require('./load-config');

const jestConfig = loadConfig();

configureRtl(jestConfig.rtlConfig);

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

failOnConsole({
  shouldFailOnLog: Boolean(process.env.CI),
  shouldFailOnInfo: Boolean(process.env.CI),
  shouldFailOnWarn: Boolean(process.env.CI),
  shouldFailOnError: Boolean(process.env.CI),
  silenceMessage: (message) => {
    if (!process.env.CI) {
      return false;
    }
    return shouldSilenceWarnings(message);
  },
  logButNotThrowMessage: (message) => {
    return shouldNotThrowWarnings(message);
  },
});

global.console.config = {};

global.console.config.addSilencedWarning = (rexExp) =>
  additionalSilencedWarnings.push(rexExp);
global.console.config.addNonThrowingWarning = (rexExp) =>
  additionalNonThrowingWarnings.push(rexExp);
