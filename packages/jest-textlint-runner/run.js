const { pass, fail } = require('create-jest-runner');
const { TextLintEngine } = require('textlint');

module.exports = async ({ testPath }) => {
  const start = new Date();
  const options = {
    formatterName: 'pretty-error',
  };
  const engine = new TextLintEngine(options);
  let errorMessage;
  try {
    const results = await engine.executeOnFiles([testPath]);
    if (engine.isErrorResults(results)) {
      errorMessage = engine.formatResults(results);
    }
  } catch (error) {
    errorMessage = error.stderr || error.stdout || error.message;
  }
  if (errorMessage)
    return Promise.resolve(
      fail({
        start,
        end: new Date(),
        test: {
          path: testPath,
          errorMessage,
        },
      })
    );
  return Promise.resolve(
    pass({
      start,
      end: new Date(),
      test: { path: testPath },
    })
  );
};
