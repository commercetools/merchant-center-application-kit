/* eslint-disable global-require */

/**
 * NOTE:
 *    `unfetch` with version 4 sarted to work as a ponyfil.
 *    Our Apollo client and http middleware need a fetch
 *    implementation explicitely being passed. While our
 *    mocking mechanisms (in app E2E tests) rely on being able
 *    to stub `fetch` on the `window` (both sharing the same implemenation).
 *    This is why `unfetch` is still used as a polyfill. Overwriting or
 *    stubbing a ponyfill is not possible as JavaScript modules are read-only.
 */
import 'unfetch/polyfill';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}
