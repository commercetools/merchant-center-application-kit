const htmlDocs = require('./load-html-docs');

module.exports = function generateTemplate({
  cssImports = [],
  scriptImports = [],
}) {
  return htmlDocs.application
    .replace(
      new RegExp('__APPLICATION_CSS_IMPORTS__', 'g'),
      cssImports.join('\n')
    )
    .replace(
      new RegExp('__APPLICATION_SCRIPT_IMPORTS__', 'g'),
      scriptImports.join('\n')
    );
};
