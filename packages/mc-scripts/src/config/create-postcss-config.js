const path = require('path');
const { browserslist } = require('../../package.json');

// This function aims to return the same result as `require.resolve`.
// However, resolving a path to a `.css` file does not return the real
// path when this file is executed within a Jest environment, because
// of the `identity-obj-proxy` resolver.
// Therefore, we trick it by resolving the package entry point and
// constructing the real path manually.
const safeResolvePath = (packageName, fileRelativePath) => {
  const defaultPackageEntryPoint = require.resolve(packageName);
  const [pathToPackage] = defaultPackageEntryPoint.split('dist');
  return path.join(pathToPackage, fileRelativePath);
};

/**
 * @param {Object} options - Configuration options to extend the default configuration
 * @param {string[]} options.postcssImportPaths[] - A list of paths where to look for files used by the `@import` statements.
 * @param {string[]} options.postcssCustomMediaPaths[] - A list of paths where to look for files with custom media queries.
 * @param {string[]} options.postcssCustomPropertiesPaths[] - A list of paths where to look for files with custom properties.
 */
module.exports = function createPostcssConfig({
  postcssImportPaths = [],
  postcssCustomMediaPaths = [],
  postcssCustomPropertiesPaths = [],
} = {}) {
  return {
    parser: false,
    map: false,
    plugins: [
      /**
       * Plugin to transform `@import` rules by inlining content.
       * https://github.com/postcss/postcss-import
       */
      require('postcss-import')({
        path: postcssImportPaths,
      }),
      /**
       * Plugin to parse CSS and add vendor prefixes to CSS rules
       * using values from "[Can I Use](https://caniuse.com/)".
       * https://github.com/postcss/autoprefixer
       */
      require('autoprefixer')({
        // Enables `-ms-` prefixes for Grid Layout including some
        // limited autoplacement support.
        // https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie
        grid: 'autoplace',
        overrideBrowserslist:
          process.env.NODE_ENV === 'production'
            ? browserslist.production
            : browserslist.development,
      }),
      /**
       * Plugin to enable Custom Media Queries in CSS, following
       * the [CSS Media Queries](https://drafts.csswg.org/mediaqueries-5/#custom-mq) specification.
       * https://github.com/postcss/postcss-custom-media
       */
      require('postcss-custom-media')({
        importFrom: [
          safeResolvePath(
            '@commercetools-frontend/application-components',
            'materials/media-queries.css'
          ),
          ...postcssCustomMediaPaths,
        ],
      }),
      /**
       * Plugin to enable Custom Properties in CSS, following
       * the [CSS Custom Properties](https://www.w3.org/TR/css-variables-1/) specification.
       * https://github.com/postcss/postcss-custom-properties
       */
      require('postcss-custom-properties')({
        preserve: false,
        importFrom: [
          safeResolvePath(
            '@commercetools-uikit/design-system',
            'materials/custom-properties.css'
          ),
          ...postcssCustomPropertiesPaths,
        ],
      }),
      /**
       * Plugin to `console.log()` the messages (warnings, etc.)
       * registered by other PostCSS plugins.
       * https://github.com/postcss/postcss-reporter
       */
      require('postcss-reporter')(),
    ],
  };
};
