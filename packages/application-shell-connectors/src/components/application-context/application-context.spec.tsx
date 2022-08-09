import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { TProjectGraphql } from '../../../../../test-data/project';
import type { TUserGraphql } from '../../../../../test-data/user';

import { ReactElement } from 'react';
import { screen, render } from '@testing-library/react';
import * as ProjectMock from '../../../../../test-data/project';
import * as UserMock from '../../../../../test-data/user';
import {
  ApplicationContextProvider,
  ApplicationContext,
  useApplicationContext,
  withApplicationContext,
  mapUserToApplicationContextUser,
  mapProjectToApplicationContextProject,
  mapEnvironmentToApplicationContextEnvironment,
} from './application-context';

type AdditionalEnvironmentProps = { foo: string };

const createTestEnvironment = (
  custom: Partial<ApplicationWindow['app']> = {}
) => ({
  revision: '1',
  applicationId: '__local:avengers',
  applicationName: 'my-app',
  entryPointUriPath: 'avengers',
  frontendHost: 'localhost:3001',
  mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
  location: 'eu',
  env: 'development',
  cdnUrl: 'http://localhost:3001',
  servedByProxy: false,
  // extra props
  foo: 'bar',
  ...custom,
});

const testUser = UserMock.random().buildGraphql<TUserGraphql>();
const testProject = ProjectMock.random()
  .name('Ultron')
  .buildGraphql<TProjectGraphql>();

const renderAppWithContext = (ui: ReactElement) => {
  return render(
    <ApplicationContextProvider<AdditionalEnvironmentProps>
      user={testUser}
      project={testProject}
      environment={createTestEnvironment()}
      projectDataLocale="en"
    >
      {ui}
    </ApplicationContextProvider>
  );
};

describe('<ApplicationContext>', () => {
  it('should render project name from context', async () => {
    renderAppWithContext(
      <ApplicationContext
        render={(context) => (
          <div>{`Project name: ${
            context.project && context.project.name
          }`}</div>
        )}
      />
    );
    await screen.findByText('Project name: Ultron');
  });
});

describe('useApplicationContext', () => {
  const TestComponent = () => {
    const projectName = useApplicationContext(
      (context) => context.project && context.project.name
    );
    return <div>{`Project name: ${projectName}`}</div>;
  };
  it('should render project name from context', async () => {
    renderAppWithContext(<TestComponent />);
    await screen.findByText('Project name: Ultron');
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
  >((context) => ({
    projectName: context.project ? context.project.name : undefined,
  }))(TestComponent);
  it('should render project name from context', async () => {
    renderAppWithContext(<AppWithContext />);
    await screen.findByText('Project name: Ultron');
  });
});

describe('mapUserToApplicationContextUser', () => {
  it('should map fetched user to user context', () => {
    expect(mapUserToApplicationContextUser(testUser)).toEqual({
      id: expect.any(String),
      email: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      locale: expect.any(String),
      timeZone: expect.any(String),
      businessRole: expect.any(String),
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
    expect(mapProjectToApplicationContextProject(testProject)).toEqual({
      key: expect.any(String),
      version: expect.any(Number),
      name: expect.any(String),
      countries: expect.any(Array),
      currencies: expect.any(Array),
      languages: expect.any(Array),
      ownerId: expect.any(String),
      ownerName: expect.any(String),
    });
  });
});

describe('mapEnvironmentToApplicationContextEnvironment', () => {
  describe('when application is configured to run behind the proxy', () => {
    it('should map environment to environment context', () => {
      expect(
        mapEnvironmentToApplicationContextEnvironment(
          createTestEnvironment({ servedByProxy: true }),
          'https://mc.europe-west1.gcp.commercetools.com'
        )
      ).toEqual({
        revision: expect.any(String),
        applicationId: expect.any(String),
        applicationName: expect.any(String),
        entryPointUriPath: expect.any(String),
        frontendHost: expect.any(String),
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        location: expect.any(String),
        env: expect.any(String),
        cdnUrl: expect.any(String),
        servedByProxy: expect.any(Boolean),
        foo: expect.any(String),
      });
    });
  });

  describe('when application is configured to not run behind the proxy', () => {
    it('should map environment to environment context', () => {
      expect(
        mapEnvironmentToApplicationContextEnvironment(createTestEnvironment())
      ).toEqual({
        revision: expect.any(String),
        applicationId: expect.any(String),
        applicationName: expect.any(String),
        entryPointUriPath: expect.any(String),
        frontendHost: expect.any(String),
        mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
        location: expect.any(String),
        env: expect.any(String),
        cdnUrl: expect.any(String),
        servedByProxy: expect.any(Boolean),
        foo: expect.any(String),
      });
    });
  });
});
