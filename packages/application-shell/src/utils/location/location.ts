/**
 * NOTE
 *    This module wraps `replace` and `reload` from the window's location.
 *    This mainly helps in tests as we often expect that a reload or
 *    replace on the location happened.
 *    In previous code we could just overwrite the properties by:
 *    `window.location.replace = jest.fn()`
 *    This will fail in never versions of JSDOM (e.g. v16) as these
 *    properties are not writable anymore. JSDOM follows the browser standards
 *    which also state that these should not be writable.
 *    There are different options to solve this:
 *      1. Extract those functions as a module an use `jest.mock` to mock them under test
 *      2. Use `Object.defineProperty` to overwrite the property
 *         - The community opinion is that this is not preferred and does
 *           not work in all cases
 *      3. Delete the property via `delete window.location` to re-create it after
 *         - This is quite repetiive and noisy in tests and can also remote
 *           other properties from under location
 *    Given option 2. and 3. being quite noisy on tests and against working with
 *    the stndards of the browser we will use 1. Here we only utilise the module
 *    mocking system of Jest and no other trickery.
 * */
const replace = (url: string): void => window.location.replace(url);
const reload = (): void => window.location.reload();

const location = {
  replace,
  reload,
};

export default location;
