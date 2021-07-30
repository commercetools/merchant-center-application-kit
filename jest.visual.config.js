process.env.ENABLE_NEW_JSX_TRANSFORM = 'true';

const jestPresetForTypescript = require('./packages/jest-preset-mc-app/jest-preset-for-typescript');

module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.visualspec\\.ts$',
  transform: jestPresetForTypescript.transform,
  globals: jestPresetForTypescript.globals,
  watchPlugins: ['jest-watch-typeahead/filename'],
};
