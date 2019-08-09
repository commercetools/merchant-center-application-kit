module.exports = {
  runner: '@commercetools-frontend/jest-textlint-runner',
  displayName: 'textlint',
  moduleFileExtensions: ['md', 'mdx'],
  modulePathIgnorePatterns: [
    'dist',
    'public',
    'packages/jest-textlint-runner/',
  ],
  testMatch: ['<rootDir>/**/*.md', '<rootDir>/**/*.mdx'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-master'],
};
