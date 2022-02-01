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

/**
 * @type {import('@svgr/core').Config}
 */
module.exports = {
  icon: false,
  svgoConfig: {
    plugins: [
      {
        // https://github.com/svg/svgo#default-preset
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'prefixIds',
    ],
  },
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  indexTemplate,
};
