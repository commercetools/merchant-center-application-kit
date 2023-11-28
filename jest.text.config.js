/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  runner: 'jest-runner-executor',
  displayName: 'vale',
  moduleFileExtensions: ['md', 'mdx'],
  modulePathIgnorePatterns: ['build', 'dist', 'public/', 'CHANGELOG.md'],
  testMatch: [
    '<rootDir>/website/**/*.md',
    '<rootDir>/website/**/*.mdx',
    '<rootDir>/website-custom-views/**/*.md',
    '<rootDir>/website-custom-views/**/*.mdx',
  ],
  watchPlugins: ['jest-watch-typeahead/filename'],
};
