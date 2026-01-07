const util = require('util');
const MutationObserver = require('@sheerun/mutationobserver-shim');

global.window.app = {
  applicationName: 'my-app',
  mcApiUrl: 'http://localhost:8080',
};

window.MutationObserver = MutationObserver;
global.Headers = global.Headers || require('node-fetch').Headers;
global.Request = global.Request || require('node-fetch').Request;
global.Response = global.Response || require('node-fetch').Response;

// Fix missing globals when `jsdom` is used in a test environment.
// See https://github.com/jsdom/jsdom/issues/2524#issuecomment-1108991178.
// Also https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom.
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: util.TextEncoder,
});
Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: util.TextDecoder,
});
