/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
// NOTE: this file is based on `babel-jest`, however we need to use `@babel/core`
// instead of `babel-core` and apparently the dependency resolution of `babel-jest`
// does not play well with that. We also need to use our own preset, therefore
// we simply implement the `transform` on our own. And since we don't use
// a `.babelrc`, we don't include it in the "cache key".
const { transform, util: babelUtil } = require('@babel/core');
const getBabePresetConfigForMcApp = require('@commercetools-frontend/babel-preset-mc-app');

const THIS_FILE = fs.readFileSync(__filename);

const { presets, plugins } = getBabePresetConfigForMcApp();

presets.push(require('babel-preset-jest'));

module.exports = {
  canInstrument: true,
  getCacheKey(fileData, filename, configString, { instrument, rootDir }) {
    return crypto
      .createHash('md5')
      .update(THIS_FILE)
      .update('\0', 'utf8')
      .update(fileData)
      .update('\0', 'utf8')
      .update(path.relative(rootDir, filename))
      .update('\0', 'utf8')
      .update(configString)
      .update('\0', 'utf8')
      .update(instrument ? 'instrument' : '')
      .digest('hex');
  },
  process(src, filename, config, transformOptions) {
    const altExts = config.moduleFileExtensions.map(
      extension => `.${extension}`
    );
    if (babelUtil && !babelUtil.canCompile(filename, altExts)) {
      return src;
    }

    const theseOptions = {
      babelrc: false,
      compact: false,
      presets,
      plugins,
      filename,
      sourceMaps: 'both',
    };
    if (transformOptions && transformOptions.instrument) {
      theseOptions.auxiliaryCommentBefore = ' istanbul ignore next ';
      // Copied from jest-runtime transform.js
      theseOptions.plugins = theseOptions.plugins.concat([
        [
          require('babel-plugin-istanbul').default,
          {
            // files outside `cwd` will not be instrumented
            cwd: config.rootDir,
            exclude: [],
          },
        ],
      ]);
    }

    // babel v7 might return null in the case when the file has been ignored.
    const transformResult = transform(src, theseOptions);

    return transformResult || src;
  },
};
