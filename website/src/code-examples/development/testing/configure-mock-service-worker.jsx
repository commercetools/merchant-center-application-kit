import { setupServer } from 'msw/node';

const mockServer = setupServer();
afterEach(() => mockServer.resetHandlers());
beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
);
afterAll(() => mockServer.close());
