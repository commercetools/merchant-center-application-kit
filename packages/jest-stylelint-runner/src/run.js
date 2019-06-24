const { pass, fail } = require('create-jest-runner');
const stylelint = require('stylelint');
const fs = require('fs');
const postcss = require('postcss');
const postcssrc = require('postcss-load-config');

const ctx = { parser: true, map: 'inline' };

const createLinter = testPath => {
  return options => {
    const start = new Date();

    return stylelint
      .lint(options)
      .then(data => {
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
      })
      .catch(err => {
        throw err;
      });
  };
};

const endsWithAny = (suffixes, string) => {
  return suffixes.some(suffix => {
    return string.endsWith(suffix);
  });
};

module.exports = ({ testPath }) => {
  const linter = createLinter(testPath);
  if (endsWithAny(['js', 'jsx', 'ts', 'tsx'], testPath)) {
    return linter(
      {
        files: testPath,
        formatter: 'string',
      },
      testPath
    );
  }

  const css = fs.readFileSync(testPath, 'utf8');

  return postcssrc(ctx, testPath).then(({ plugins, options }) => {
    return postcss(plugins)
      .process(css, { ...options, from: testPath })
      .then(result => {
        return linter({
          code: result.css,
          formatter: 'string',
        });
      });
  });
};
