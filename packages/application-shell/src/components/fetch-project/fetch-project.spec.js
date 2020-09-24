import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { ProjectMock } from '../../../../../graphql-test-utils';
import {
  experimentalRenderAppWithRedux,
  screen,
  waitForElementToBeRemoved,
} from '../../test-utils';
import FetchProject from './fetch-project';

jest.mock('@commercetools-frontend/sentry');

const mockServer = setupServer(
  graphql.query('FetchProject', (req, res, ctx) =>
    res(
      ctx.data({
        project: ProjectMock.build({
          key: 'test-1',
          name: 'Test 1',
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

const renderProject = (options) =>
  experimentalRenderAppWithRedux(
    <FetchProject projectKey="test-1">
      {({ isLoading, error, project }) => {
        if (isLoading) return <div>{'loading...'}</div>;
        if (error) return <div>{`Error: ${error.message}`}</div>;
        if (project) return <div>{`Project: ${project.name}`}</div>;
        return null;
      }}
    </FetchProject>,
    options
  );

describe('rendering', () => {
  it('should fetch project and pass data to children function', async () => {
    renderProject();
    await waitForElementToBeRemoved(() => screen.getByText('loading...'));
    expect(screen.getByText(/Test 1/i)).toBeInTheDocument();
  });
  it('should render error state', async () => {
    mockServer.use(
      graphql.query('FetchProject', (req, res, ctx) => {
        return res.data(ctx.status(401));
      })
    );
    renderProject();
    await waitForElementToBeRemoved(() => screen.getByText('loading...'));
    expect(screen.getByText(/Error: Network error(.*)/i)).toBeInTheDocument();
    expect(reportErrorToSentry).toHaveBeenCalled();
  });
});
