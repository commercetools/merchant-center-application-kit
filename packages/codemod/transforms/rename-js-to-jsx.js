const fs = require('fs');

/**
 * @type {import('jscodeshift').Transform}
 */
function renameJsToJsx(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  if (file.path.endsWith('.js') && !file.path.endsWith('.spec.js')) {
    const hasJSXElements = root.findJSXElements().length > 0;

    if (hasJSXElements) {
      if (options.dry) {
        api.stats(file.path);
      } else {
        fs.renameSync(file.path, file.path.replace('.js', '.jsx'));
      }
    }
  }

  return root.toSource(options);
}

module.exports = renameJsToJsx;
