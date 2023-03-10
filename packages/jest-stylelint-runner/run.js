const fs = require('fs');
const { pass, fail } = require('create-jest-runner');
const postcss = require('postcss');
const loadPostCssConfig = require('postcss-load-config');
const stylelint = require('stylelint');

const createLinter = (testPath) => {
  return (options) => {
    const start = new Date();

    return stylelint.lint(options).then((data) => {
      if (data.errored) {
        return fail({
          start,
          end: new Date(),
          test: {
            path: testPath,
            errorMessage: data.output,
          },
        });
      }

      return pass({
        start,
        end: new Date(),
        test: { path: testPath },
      });
    });
  };
};

module.exports = async ({ testPath }) => {
  const linter = createLinter(testPath);

  const css = fs.readFileSync(testPath, { encoding: 'utf8' });

  const { plugins, options } = await loadPostCssConfig();

  const result = await postcss(plugins).process(css, {
    ...options,
    from: testPath,
    to: testPath,
  });

  return linter({
    code: result.css,
    formatter: 'string',
  });
};
