module.exports = {
  development: ['chrome', 'firefox'].map(
    browser => `last 2 ${browser} versions`
  ),
  production: ['>1%', 'not op_mini all', 'ie 11'],
};
