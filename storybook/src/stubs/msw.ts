// Storybook 9.1's injected mocker imports `msw/browser`, absent in msw v1; the path never runs.
// Delete when msw reaches v2 or the mocker becomes opt-in.
const unavailable = (name: string) => () => {
  throw new Error(
    `Storybook stubbed \`${name}\`: module mocking needs msw v2, and this repo is on v1.`
  );
};

export const setupWorker = unavailable('msw/browser#setupWorker');
export const http = unavailable('msw/core/http#http');
