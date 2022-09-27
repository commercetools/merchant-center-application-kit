// This module is based on the package `jest-fail-on-console` but with some custom adjustments.
const util = require('util');
const colors = require('colors/safe');

const defaultErrorMessage = (methodName, bold) =>
  `Expected test not to call ${bold(`console.${methodName}()`)}.\n\n` +
  `If the ${methodName} is expected, test for it explicitly by mocking it out using ${bold(
    'jest.spyOn'
  )}(console, '${methodName}').mockImplementation() and test that the warning occurs.`;

const failOnConsole = ({
  errorMessage = defaultErrorMessage,
  shouldFailOnAssert = false,
  shouldFailOnDebug = false,
  shouldFailOnLog = false,
  shouldFailOnInfo = false,
  shouldFailOnWarn = true,
  shouldFailOnError = true,
  skipTest,
  silenceMessage,
  logButNotThrowMessage,
} = {}) => {
  const flushUnexpectedConsoleCalls = (
    methodName,
    unexpectedConsoleCallStacks
  ) => {
    if (unexpectedConsoleCallStacks.length > 0) {
      const messages = unexpectedConsoleCallStacks.map(([stack, message]) => {
        const stackLines = stack.split('\n');
        return (
          `${colors.red(message)}\n` +
          `${stackLines
            .map((line, index) => {
              if (index === stackLines.length - 1) {
                return colors.white(line);
              }
              return colors.gray(line);
            })
            .join('\n')}`
        );
      });

      const message = errorMessage(methodName, colors.bold);

      throw new Error(`${message}\n\n${messages.join('\n\n')}`);
    }
  };

  const patchConsoleMethod = (methodName) => {
    let originalMethod = console[methodName];

    const unexpectedConsoleCallStacks = [];

    const captureMessage = (format, ...args) => {
      const message = util.format(format, ...args);

      if (silenceMessage && silenceMessage(message, methodName)) {
        return;
      }

      if (logButNotThrowMessage && logButNotThrowMessage(message, methodName)) {
        originalMethod(format, ...args);
        return;
      }

      // Capture the call stack now so we can warn about it later.
      // The call stack has helpful information for the test author.
      // Don't throw yet though b'c it might be accidentally caught and suppressed.
      const { stack } = new Error();
      if (stack) {
        unexpectedConsoleCallStacks.push([
          stack.substr(stack.indexOf('\n') + 1),
          message,
        ]);
      }
    };

    const newAssertMethod = (assertion, format, ...args) => {
      if (assertion) {
        return;
      }

      captureMessage(format, ...args);
    };

    const newMethod =
      methodName === 'assert' ? newAssertMethod : captureMessage;

    const canSkipTest = () => {
      const currentTestState = expect.getState();
      const testName = currentTestState.currentTestName;
      const testPath = currentTestState.testPath;

      if (skipTest && skipTest({ testName, testPath })) return true;

      return false;
    };
    const shouldSkipTest = canSkipTest();

    beforeEach(() => {
      if (shouldSkipTest) return;

      console[methodName] = newMethod; // eslint-disable-line no-console
      unexpectedConsoleCallStacks.length = 0;
    });

    afterEach(() => {
      if (shouldSkipTest) return;

      flushUnexpectedConsoleCalls(methodName, unexpectedConsoleCallStacks);
      console[methodName] = originalMethod;
    });
  };

  if (shouldFailOnAssert) patchConsoleMethod('assert');
  if (shouldFailOnDebug) patchConsoleMethod('debug');
  if (shouldFailOnLog) patchConsoleMethod('log');
  if (shouldFailOnInfo) patchConsoleMethod('info');
  if (shouldFailOnWarn) patchConsoleMethod('warn');
  if (shouldFailOnError) patchConsoleMethod('error');
};

module.exports = failOnConsole;
