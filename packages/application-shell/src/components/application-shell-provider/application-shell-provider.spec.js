import { PureComponent } from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { ReactReduxContext } from 'react-redux';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
// eslint-disable-next-line import/named
import { __setIsAuthenticated } from '../authenticated/am-i-logged-in';
import hasCachedAuthenticationState from '../authenticated/has-cached-authentication-state';
import ApplicationShellProvider from './application-shell-provider';
import { getBrowserLocale } from './utils';

// Need to mock the moment locale we try to load in these tests
// since those files are ESM and not supported in jest.
// (and we don't need its content for these tests)
jest.mock('moment/dist/locale/de', () => {});
jest.mock('../authenticated/has-cached-authentication-state');
jest.mock('../authenticated/am-i-logged-in');
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  getBrowserLocale: jest.fn(),
}));

const createTestProps = (props) => ({
  applicationMessages: {
    en: { 'CustomApp.title': 'Title en' },
    'en-US': { 'CustomApp.title': 'Title' },
    de: { 'CustomApp.title': 'Titel' },
  },
  environment: {
    applicationName: 'my-app',
    frontendHost: 'localhost:3001',
    mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
    location: 'eu',
    env: 'development',
    cdnUrl: 'http://localhost:3001',
    servedByProxy: 'false',
  },
  children: jest.fn(),
  ...props,
});

describe('rendering', () => {
  beforeEach(() => {
    hasCachedAuthenticationState.mockReturnValue(true);
  });
  it('should access environment from application context', async () => {
    render(
      <ApplicationShellProvider {...createTestProps()}>
        {() => (
          <ApplicationContext
            render={({ environment }) => <div>{environment.location}</div>}
          />
        )}
      </ApplicationShellProvider>
    );
    await screen.findByText('eu');
  });
  it('should access redux store from context', () => {
    let hasStore = false;
    render(
      <ApplicationShellProvider {...createTestProps()}>
        {() => (
          <ReactReduxContext.Consumer>
            {({ store }) => {
              if (store) {
                hasStore = true;
              }
              return null;
            }}
          </ReactReduxContext.Consumer>
        )}
      </ApplicationShellProvider>
    );
    expect(hasStore).toBe(true);
  });
  it('should pass isAuthenticated=true if local storage has auth key', () => {
    let isAuth;
    render(
      <ApplicationShellProvider {...createTestProps()}>
        {({ isAuthenticated }) => {
          isAuth = isAuthenticated;
          return <div />;
        }}
      </ApplicationShellProvider>
    );
    expect(isAuth).toBe(true);
  });
  it('should pass isAuthenticated=false if local storage does not have auth key', async () => {
    hasCachedAuthenticationState.mockReturnValue(false);
    __setIsAuthenticated(false);
    let isAuth;
    render(
      <ApplicationShellProvider {...createTestProps()}>
        {({ isAuthenticated }) => {
          isAuth = isAuthenticated;
          return <div />;
        }}
      </ApplicationShellProvider>
    );
    await waitFor(() => {
      expect(isAuth).toBe(false);
    });
  });
  it('when not authenticated, it should setup intl provider', async () => {
    hasCachedAuthenticationState.mockReturnValue(false);
    __setIsAuthenticated(false);
    getBrowserLocale.mockReturnValue('de');
    render(
      <ApplicationShellProvider {...createTestProps()}>
        {({ isAuthenticated }) =>
          isAuthenticated ? null : (
            <FormattedMessage id="CustomApp.title" defaultMessage="Wrong" />
          )
        }
      </ApplicationShellProvider>
    );
    await screen.findByText('Titel');
  });
  it('when authenticated, it should render children', async () => {
    render(
      <ApplicationShellProvider {...createTestProps()}>
        {({ isAuthenticated }) =>
          isAuthenticated ? <div>{'Hello'}</div> : null
        }
      </ApplicationShellProvider>
    );
    await screen.findByText('Hello');
  });
  it('when something in the children throws, it should render the error apologiser page', async () => {
    console.error = jest.fn();
    class Thrower extends PureComponent {
      componentDidMount() {
        throw new Error('Oops');
      }
      render() {
        return null;
      }
    }
    render(
      <IntlProvider locale="en" messages={{}}>
        <ApplicationShellProvider {...createTestProps()}>
          {() => <Thrower />}
        </ApplicationShellProvider>
      </IntlProvider>
    );
    await screen.findByText(/Sorry! An unexpected error occured/i);
    expect(console.error).toHaveBeenCalled();
  });
});
