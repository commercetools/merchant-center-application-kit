const { pass, fail } = require('create-jest-runner');
const stylelint = require('stylelint');
const postcssImport = require('postcss-import');
const postcssCustomMediaQueries = require('postcss-custom-media');
const cssVariables = require('postcss-css-variables');
const uiKitVariables = require('@commercetools-frontend/ui-kit/materials/custom-properties.json');
const fs = require('fs');
const postcss = require('postcss');

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
  return suffixes.some(function(suffix) {
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

  return postcss([
    postcssImport,
    postcssCustomMediaQueries({
      importFrom: require.resolve(
        '@commercetools-frontend/application-components/materials/media-queries.css'
      ),
    }),
    cssVariables({
      variables: uiKitVariables,
    }),
  ])
    .process(css, { from: testPath })
    .then(result => {
      return linter({
        code: result.css,
        formatter: 'string',
      });
    });
};
