// Storybook 9.1's module mocker imports `msw/browser`, which msw v1 doesn't ship, so the
// build fails to resolve it. Delete when msw reaches v2 or the mocker becomes opt-in.
const unavailable = (name: string) => () => {
  throw new Error(
    `Storybook stubbed \`${name}\`: module mocking needs msw v2, and this repo is on v1.`
  );
};

export const setupWorker = unavailable('msw/browser#setupWorker');
export const http = unavailable('msw/core/http#http');
