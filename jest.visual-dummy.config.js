module.exports = {
  preset: 'jest-puppeteer',
  testRegex: 'dummy\\.visualspec\\.js$',
  transform: {
    '^.+\\.js$':
      '<rootDir>/packages/jest-preset-mc-app/transform-babel-jest.js',
  },
  globals: {
    HOST: 'http://localhost:3999',
  },
};
