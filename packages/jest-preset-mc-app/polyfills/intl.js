// Polyfill `Intl` for NodeJS, as `react-intl` (v3) relies on the `intl-locales-supported`
// package, which checks if the locale is supported by the following constructors.
// In the browser everything is fine, however in NodeJS environment we need to polyfill it.
// https://github.com/formatjs/formatjs/tree/master/packages/intl-messageformat#modern-intl-dependency
global.Intl = require('intl');
global.Intl.PluralRules = require('./intl-pluralrules');
