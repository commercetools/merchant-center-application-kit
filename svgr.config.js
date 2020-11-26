/* eslint-disable global-require */
const path = require('path');

const indexTemplate = (filePaths) => {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = `${basename}SvgIcon`;
    return `export { default as ${exportName} } from './${basename}'`;
  });
  return exportEntries.join('\n');
};

module.exports = {
  icon: false,
  svgoConfig: {
    plugins: [
      { removeViewBox: false },
      { prefixIds: true },
      // Keeps ID's of svgs so they can be targeted with CSS
      { cleanupIDs: false },
    ],
  },
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  indexTemplate,
};
