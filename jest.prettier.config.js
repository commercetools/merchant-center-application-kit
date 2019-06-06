module.exports = {
  runner: 'jest-runner-prettier',
  displayName: 'prettier',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'md', 'mdx', 'css', 'yaml', 'yml'],
  testMatch: [
    '<rootDir>/**/*.js',
    '<rootDir>/**/*.ts',
    '<rootDir>/**/*.tsx',
    '<rootDir>/**/*.css',
    '<rootDir>/**/*.md',
    '<rootDir>/**/*.mdx',
  ],
};
