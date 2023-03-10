import { mocked } from 'jest-mock';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { STORAGE_KEYS } from '../../constants';
import { renderApp, waitFor } from '../../test-utils';
import type {
  TAmILoggedInQuery,
  TAmILoggedInQueryVariables,
} from '../../types/generated/mc';
import type { TProps } from './authenticated';
import Authenticated from './authenticated';

const createTestProps = (custom: Partial<TProps> = {}) => ({
  render: jest.fn(() => <div />),
  locale: 'en',
  applicationMessages: {},
  ...custom,
});

const mockServer = setupServer(
  graphql.query<TAmILoggedInQuery, TAmILoggedInQueryVariables>(
    'AmILoggedIn',
    (_req, res, ctx) => res(ctx.data({ amILoggedIn: true }))
  )
);

beforeEach(() => {
  mocked(window.localStorage.setItem).mockClear();
  mocked(window.localStorage.getItem).mockClear();
  mocked(window.localStorage.removeItem).mockClear();
});
afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

describe('rendering', () => {
  describe('when authenticated state was cached in local storage', () => {
    it('should call render with `isAuthenticated` set to true', async () => {
      mocked(window.localStorage.getItem).mockReturnValue('true');
      const props = createTestProps();
      renderApp(<Authenticated {...props} />, {
        disableRoutePermissionCheck: true,
      });
      await waitFor(() => {
        expect(props.render).toHaveBeenCalledWith({ isAuthenticated: true });
      });
    });
  });
  describe('when authenticated state is not in local storage', () => {
    describe('when authentication request succeeds', () => {
      it('should call render with `isAuthenticated` set to true', async () => {
        mocked(window.localStorage.getItem).mockReturnValue(null);
        const props = createTestProps();
        renderApp(<Authenticated {...props} />, {
          disableRoutePermissionCheck: true,
        });
        await waitFor(() => {
          expect(props.render).toHaveBeenCalledWith({ isAuthenticated: true });
        });
        expect(mocked(window.localStorage.setItem)).toHaveBeenCalledWith(
          STORAGE_KEYS.IS_AUTHENTICATED,
          'true'
        );
      });
    });
    describe('when authentication request fails', () => {
      it('should call render with `isAuthenticated` set to false', async () => {
        mockServer.use(
          graphql.query<TAmILoggedInQuery, TAmILoggedInQueryVariables>(
            'AmILoggedIn',
            (_req, res, ctx) =>
              res.once(ctx.errors([{ message: 'Unauthorized' }]))
          )
        );
        console.error = jest.fn();
        mocked(window.localStorage.getItem).mockReturnValue(null);
        const props = createTestProps();
        renderApp(<Authenticated {...props} />, {
          disableRoutePermissionCheck: true,
        });
        await waitFor(() => {
          expect(props.render).toHaveBeenCalledWith({ isAuthenticated: false });
        });
        expect(mocked(window.localStorage.setItem)).not.toHaveBeenCalledWith(
          STORAGE_KEYS.IS_AUTHENTICATED,
          expect.anything()
        );
        expect(mocked(window.localStorage.removeItem)).toHaveBeenCalledWith(
          STORAGE_KEYS.IS_AUTHENTICATED
        );
      });
    });
  });
});
