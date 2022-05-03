/**
 * This file is expected to be included in the package as it's referenced for the `--transformer` option
 * in the `compile-html` command.
 *
 * @example
 * ```
 * mc-scripts compile-html --transformer @commercetools-frontend/mc-dev-authentication/transformer-local.js
 * ```
 */

const { transformerLocal } = require('.');
module.exports = transformerLocal;
