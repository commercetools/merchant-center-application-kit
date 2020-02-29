/**
 * NOTE:
 *   `@formatjs/macro` matches the default babel-macros RegExp.
 *   This prevents updating `react-intl` here and e.g. in create-react-app.
 *   As neither side `react-intl` nor `babel-plugin-macros` intends to either
 *   change the package name or RegExp we extend the default RegExp
 *   and pass it to the plugin as `isMacrosName`.
 *
 *   Ref: https://github.com/kentcdodds/babel-plugin-macros/issues/131#issuecomment-563191982
 */

//
/**
 * NOTE:
 *   Needed so webpack does not fail with:
 *
 *   `Cannot read property 'resolved' of undefined`.
 *
 *   The `babel-preset-gatsby` uses the same trick.
 */
const resolve = m => require.resolve(m);

const defaultMacrosRegex = /[./]macro(\.js)?$/;
const isMacrosName = packageName =>
  defaultMacrosRegex.test(packageName) &&
  packageName.indexOf('@formatjs/macro') === -1;

function getConfig() {
  return {
    plugins: [
      [
        resolve('babel-plugin-macros'),
        {
          isMacrosName,
        },
      ],
    ],
    presets: [[resolve('babel-preset-gatsby')]],
  };
}

module.exports = getConfig();
