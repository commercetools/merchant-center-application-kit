const util = require('util');
const MutationObserver = require('@sheerun/mutationobserver-shim');

global.window.app = {
  applicationName: 'my-app',
  mcApiUrl: 'http://localhost:8080',
};

window.MutationObserver = MutationObserver;
const { Headers, Request, Response } = require('node-fetch');
global.Headers = global.Headers || Headers;
global.Request = global.Request || Request;
global.Response = global.Response || Response;

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
