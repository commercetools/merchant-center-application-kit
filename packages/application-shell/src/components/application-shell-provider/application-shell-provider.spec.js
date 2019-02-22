import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as storage from '@commercetools-frontend/storage';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { render, waitForElement } from 'react-testing-library';
import { GtmContext } from '../gtm-booter';
import { getBrowserLanguage, mergeMessages } from './utils';
import ApplicationShellProvider from './application-shell-provider';

jest.mock('@commercetools-frontend/storage');
jest.mock('@commercetools-frontend/sentry');
jest.mock('./utils');

const createTestProps = props => ({
  applicationMessages: {
    en: { 'CustomApp.title': 'Title en' },
    'en-US': { 'CustomApp.title': 'Title' },
    de: { 'CustomApp.title': 'Titel' },
  },
  environment: {
    frontendHost: 'localhost:3001',
    mcApiUrl: 'https://mc-api.commercetools.com',
    location: 'eu',
    env: 'development',
    cdnUrl: 'http://localhost:3001',
    servedByProxy: false,
  },
  trackingEventWhitelist: {},
  children: jest.fn(),
  ...props,
});

describe('rendering', () => {
  it('should access environment from application context', async () => {
    const { getByText } = render(
      <ApplicationShellProvider {...createTestProps()}>
        {() => (
          <ApplicationContext
            render={({ environment }) => <div>{environment.location}</div>}
          />
        )}
      </ApplicationShellProvider>
    );
    await waitForElement(() => getByText('eu'));
  });
  it('should access redux store from context', () => {
    let hasStore = false;
    render(
      <ApplicationShellProvider {...createTestProps()}>
        {() => (
          <ReactReduxContext.Consumer>
            {({ storeState }) => {
              if (storeState) {
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
  it('should access gtm from context', () => {
    let hasTracking = false;
    render(
      <ApplicationShellProvider {...createTestProps()}>
        {() => (
          <GtmContext.Consumer>
            {({ track }) => {
              if (track) {
                hasTracking = true;
              }
              return null;
            }}
          </GtmContext.Consumer>
        )}
      </ApplicationShellProvider>
    );
    expect(hasTracking).toBe(true);
  });
  it('should pass isAuthenticated=true if local storage has auth key', () => {
    storage.get.mockReturnValue('true');
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
  it('should pass isAuthenticated=false if local storage does not have auth key', () => {
    storage.get.mockReturnValue('false');
    let isAuth;
    render(
      <ApplicationShellProvider {...createTestProps()}>
        {({ isAuthenticated }) => {
          isAuth = isAuthenticated;
          return <div />;
        }}
      </ApplicationShellProvider>
    );
    expect(isAuth).toBe(false);
  });
  it('when not authenticated, it should setup intl provider', async () => {
    storage.get.mockReturnValue('false');
    getBrowserLanguage.mockReturnValue('de');
    mergeMessages.mockImplementation((...messages) =>
      Object.assign({}, ...messages)
    );
    const { getByText } = render(
      <ApplicationShellProvider {...createTestProps()}>
        {({ isAuthenticated }) =>
          isAuthenticated ? null : (
            <FormattedMessage id="CustomApp.title" defaultMessage="Wrong" />
          )
        }
      </ApplicationShellProvider>
    );
    await waitForElement(() => getByText('Titel'));
  });
  it('when authenticated, it should render children', async () => {
    storage.get.mockReturnValue('true');
    const { getByText } = render(
      <ApplicationShellProvider {...createTestProps()}>
        {({ isAuthenticated }) =>
          isAuthenticated ? <div>{'Hello'}</div> : null
        }
      </ApplicationShellProvider>
    );
    await waitForElement(() => getByText('Hello'));
  });
  it('when something in the children throws, it should render the error apologiser page', async () => {
    console.error = jest.fn();
    class Thrower extends React.PureComponent {
      componentDidMount() {
        throw new Error('Oops');
      }
      render() {
        return null;
      }
    }
    const { getByText } = render(
      <ApplicationShellProvider {...createTestProps()}>
        {() => <Thrower />}
      </ApplicationShellProvider>
    );
    await waitForElement(() =>
      getByText(/Sorry! An unexpected error occured/i)
    );
    expect(console.error).toHaveBeenCalled();
  });
});
