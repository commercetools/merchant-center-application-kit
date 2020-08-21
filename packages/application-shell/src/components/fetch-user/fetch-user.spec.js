import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { UserMock } from '../../../../../graphql-test-utils';
import {
  experimentalRenderAppWithRedux,
  screen,
  waitForElementToBeRemoved,
} from '../../test-utils';
import FetchUser from './fetch-user';

jest.mock('@commercetools-frontend/sentry');

const mockServer = setupServer(
  graphql.query('FetchLoggedInUser', (req, res, ctx) =>
    res(
      ctx.data({
        user: UserMock.build({
          firstName: 'John',
        }),
      })
    )
  )
);
afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

const renderUser = (options) =>
  experimentalRenderAppWithRedux(
    <FetchUser>
      {({ isLoading, error, user }) => {
        if (isLoading) return <div>{'loading...'}</div>;
        if (error) return <div>{`Error: ${error.message}`}</div>;
        if (user) return <div>{`User: ${user.firstName}`}</div>;
        return null;
      }}
    </FetchUser>,
    options
  );

describe('rendering', () => {
  it('should fetch user and pass data to children function', async () => {
    renderUser();
    await waitForElementToBeRemoved(() => screen.getByText('loading...'));
    expect(screen.getByText(/John/i)).toBeInTheDocument();
  });
  it('should render error state', async () => {
    mockServer.use(
      graphql.query('FetchLoggedInUser', (req, res, ctx) => {
        return res.once(ctx.status(401));
      })
    );
    renderUser();
    await waitForElementToBeRemoved(() => screen.getByText('loading...'));
    expect(screen.getByText(/Error: Network error(.*)/i)).toBeInTheDocument();
    expect(reportErrorToSentry).toHaveBeenCalled();
  });
});
