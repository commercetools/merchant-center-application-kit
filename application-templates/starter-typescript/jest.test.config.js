process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';
const jestPresetForTypeScript = require('@commercetools-frontend/jest-preset-mc-app/jest-preset-for-typescript');

/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  ...jestPresetForTypeScript,
};
