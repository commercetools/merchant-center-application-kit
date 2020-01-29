import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import {
  ApplicationContextProvider,
  ApplicationContext,
  useApplicationContext,
  withApplicationContext,
  mapUserToApplicationContextUser,
  mapProjectToApplicationContextProject,
} from './application-context';
import { ApplicationWindow } from '@commercetools-frontend/constants';

type AdditionalEnvironmentProps = { foo: string };

const createTestUser = (custom = {}) => ({
  id: 'u1',
  email: 'foo@bar.com',
  firstName: 'foo',
  lastName: 'bar',
  language: 'en',
  timeZone: undefined,
  // Fields that should not be exposed
  numberFormat: 'en',
  gravatarHash: 'aaa',
  defaultProjectKey: 'aaaa',
  projects: {
    total: 1,
    results: [
      {
        key: 'p1',
        name: 'P1 ',
        expiry: { isActive: false },
        suspension: { isActive: false },
      },
    ],
  },
  launchdarklyTrackingGroup: 'commercetools',
  launchdarklyTrackingSubgroup: 'dev',
  launchdarklyTrackingId: '111',
  launchdarklyTrackingTeam: undefined,
  launchdarklyTrackingTenant: 'gcp-eu',
  ...custom,
});
const createTestProject = (custom = {}) => ({
  key: 'foo-1',
  version: 1,
  name: 'Foo 1',
  countries: ['us'],
  currencies: ['USD'],
  languages: ['en'],
  allAppliedPermissions: [{ name: 'canManageProjectSettings', value: true }],
  allAppliedActionRights: [],
  allAppliedDataFences: [],
  allAppliedMenuVisibilities: [],
  // Fields that should not be exposed
  initialized: true,
  expiry: {
    isActive: false,
    daysLeft: undefined,
  },
  suspension: {
    isActive: false,
    reason: undefined,
  },
  owner: { id: 'o1' },
  ...custom,
});
const createTestEnvironment = (
  custom: Partial<ApplicationWindow['app']> = {}
) => ({
  revision: '1',
  applicationName: 'my-app',
  frontendHost: 'localhost:3001',
  mcApiUrl: 'https://mc-api.commercetools.com',
  location: 'eu',
  env: 'development',
  cdnUrl: 'http://localhost:3001',
  servedByProxy: false,
  // extra props
  foo: 'bar',
  ...custom,
});

const renderAppWithContext = (ui: React.ReactElement) =>
  render(
    <ApplicationContextProvider<AdditionalEnvironmentProps>
      user={createTestUser()}
      project={createTestProject()}
      environment={createTestEnvironment()}
      projectDataLocale="en"
    >
      {ui}
    </ApplicationContextProvider>
  );

describe('<ApplicationContext>', () => {
  it('should render project name from context', async () => {
    const rendered = renderAppWithContext(
      <ApplicationContext
        render={context => (
          <div>{`Project name: ${context.project &&
            context.project.name}`}</div>
        )}
      />
    );
    await waitForElement(() => rendered.getByText('Project name: Foo 1'));
  });
});

describe('useApplicationContext', () => {
  const TestComponent = () => {
    const projectName = useApplicationContext(
      context => context.project && context.project.name
    );
    return <div>{`Project name: ${projectName}`}</div>;
  };
  it('should render project name from context', async () => {
    const rendered = renderAppWithContext(<TestComponent />);
    await waitForElement(() => rendered.getByText('Project name: Foo 1'));
  });
});

describe('withApplicationContext', () => {
  type AppProps = { projectName?: string; children?: never };
  const TestComponent = (props: AppProps) => (
    <div>{`Project name: ${props.projectName}`}</div>
  );
  const AppWithContext = withApplicationContext<
    Pick<AppProps, 'children'>,
    {},
    Pick<AppProps, 'projectName'>
  >(context => ({
    projectName: context.project ? context.project.name : undefined,
  }))(TestComponent);
  it('should render project name from context', async () => {
    const rendered = renderAppWithContext(<AppWithContext />);
    await waitForElement(() => rendered.getByText('Project name: Foo 1'));
  });
});

describe('mapUserToApplicationContextUser', () => {
  it('should map fetched user to user context', () => {
    expect(mapUserToApplicationContextUser(createTestUser())).toEqual({
      id: expect.any(String),
      email: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      locale: expect.any(String),
      timeZone: expect.any(String),
      projects: expect.objectContaining({
        total: 1,
        results: expect.arrayContaining([
          expect.objectContaining({ key: expect.any(String) }),
        ]),
      }),
    });
  });
});

describe('mapProjectToApplicationContextProject', () => {
  it('should map fetched project to project context', () => {
    expect(mapProjectToApplicationContextProject(createTestProject())).toEqual({
      key: expect.any(String),
      version: expect.any(Number),
      name: expect.any(String),
      countries: expect.any(Array),
      currencies: expect.any(Array),
      languages: expect.any(Array),
      ownerId: expect.any(String),
    });
  });
});
