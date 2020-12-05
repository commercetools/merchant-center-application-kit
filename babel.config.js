// Do this as the first thing so that any code reading it knows the right env.
process.env.BUILD_ROLLUP = true;

module.exports = {
  presets: ['@commercetools-frontend/babel-preset-mc-app'],
  plugins: [
    'babel-plugin-import-graphql',
    'babel-plugin-typescript-to-proptypes',
  ],
};
