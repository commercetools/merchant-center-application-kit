import type { TUserGraphql } from '../../../../../test-data/user';

import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import * as UserMock from '../../../../../test-data/user';
import { renderApp, screen, waitForElementToBeRemoved } from '../../test-utils';
import FetchUser from './fetch-user';

jest.mock('@commercetools-frontend/sentry');

const mockServer = setupServer(
  graphql.query('FetchLoggedInUser', (_req, res, ctx) =>
    res.once(
      ctx.data({
        user: UserMock.random().firstName('John').buildGraphql<TUserGraphql>(),
      })
    )
  )
);
afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

const renderUser = () =>
  renderApp(
    <FetchUser>
      {({ isLoading, error, user }) => {
        if (isLoading) return <div>{'loading...'}</div>;
        if (error) return <div>{`Error: ${error.message}`}</div>;
        if (user) return <div>{`User: ${user.firstName}`}</div>;
        return null;
      }}
    </FetchUser>
  );

describe('rendering', () => {
  describe('when fetching user succeeds', () => {
    it('should fetch user and pass data to children function', async () => {
      renderUser();

      await waitForElementToBeRemoved(screen.queryByText('loading...'));

      expect(screen.getByText(/John/i)).toBeInTheDocument();
    });
  });

  describe('when fetching user fails with a graphql error', () => {
    it('should render error state', async () => {
      mockServer.use(
        graphql.query('FetchLoggedInUser', (_req, res, ctx) =>
          res(ctx.errors([{ message: 'Something went wrong' }]))
        )
      );

      renderUser();

      await waitForElementToBeRemoved(screen.queryByText('loading...'));

      expect(
        screen.getByText(/Error: Something went wrong(.*)/i)
      ).toBeInTheDocument();
      expect(reportErrorToSentry).toHaveBeenCalled();
    });
  });

  describe('when fetching user fails with a network error', () => {
    it('should render error state', async () => {
      mockServer.use(
        graphql.query('FetchLoggedInUser', (_req, res, ctx) =>
          res(ctx.status(401), ctx.data({ message: 'Unauthorized' }))
        )
      );

      renderUser();

      await waitForElementToBeRemoved(screen.queryByText('loading...'));

      expect(
        screen.getByText(/Error: Response not successful(.*)/i)
      ).toBeInTheDocument();
      expect(reportErrorToSentry).toHaveBeenCalled();
    });
  });
});
