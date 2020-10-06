// This file tests our test-utils file #inception
//
// The TestComponents are expected to work. We run the tests to ensure that
// the `render` method sets up the tests correctly.
// This is a bit different from our usual tests, as we are testing our testing
// tools here instead of actual components.
import React from 'react';
import PropTypes from 'prop-types';
import { InMemoryCache, ApolloClient, HttpLink, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { useMcQuery } from '../hooks/apollo-hooks';
import {
  renderApp,
  renderAppWithRedux,
  experimentalRenderAppWithRedux,
  waitFor,
} from './test-utils';

describe('Intl', () => {
  const TestComponent = () => {
    const intl = useIntl();
    return <span>{intl.locale}</span>;
  };
  it('should have intl', async () => {
    const rendered = renderApp(<TestComponent />);
    await rendered.findByText('en');
  });
  it('should be possible to overwrite', async () => {
    const rendered = renderApp(<TestComponent />, {
      locale: 'de',
    });
    await rendered.findByText('de');
  });
});

describe('ApolloMockProvider', () => {
  const SomeQuery = gql`
    query Wow {
      foo {
        name
      }
    }
  `;
  const TestComponent = () => {
    const { data } = useMcQuery<{ foo?: { name: string } }>(SomeQuery, {
      context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
    });
    if (!data || !data.foo) return <>{'loading'}</>;
    return <>{data.foo.name}</>;
  };
  it('should be possible to fake GraphQL requests', async () => {
    const rendered = renderApp(<TestComponent />, {
      mocks: [
        {
          request: {
            query: SomeQuery,
            context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
          },
          result: { data: { foo: { name: 'Snoop Dogg' } } },
        },
      ],
    });
    await rendered.findByText('Snoop Dogg');
  });
});

describe('`flopflip`', () => {
  const FEATURE_NAME = 'fooBar';
  const TestComponent = () => {
    const isFeatureEnabled = useFeatureToggle(FEATURE_NAME);
    return <p>Enabled: {isFeatureEnabled ? 'Yes' : 'No'}</p>;
  };
  it('should not enable features toggles by default', async () => {
    const rendered = renderApp(<TestComponent />);
    await rendered.findByText(/Enabled: No/i);
  });
  it('should be possible to enable feature toggles', async () => {
    const rendered = renderApp(<TestComponent />, {
      flags: { [FEATURE_NAME]: true },
    });
    await rendered.findByText(/Enabled: Yes/i);
  });
});

describe('ApplicationContext', () => {
  describe('user', () => {
    const TestComponent = () => (
      <ApplicationContext
        render={({ user }) => (
          <>{user && [user.firstName, user.lastName].join(' ')}</>
        )}
      />
    );

    it('should render with defaults', async () => {
      const rendered = renderApp(<TestComponent />);
      await rendered.findByText('Sheldon Cooper');
      // the user should be returned from "render"
      expect(rendered.user).toEqual(
        expect.objectContaining({
          id: 'user-id-1',
          email: 'sheldon.cooper@caltech.edu',
          firstName: 'Sheldon',
          lastName: 'Cooper',
          language: 'en',
          timeZone: 'Etc/UTC',
        })
      );
    });

    it('should respect user overwrites', async () => {
      const rendered = renderApp(<TestComponent />, {
        user: { firstName: 'Leonard' },
      });
      // shows that data gets merged and overwrites have priority
      await rendered.findByText('Leonard Cooper');
      // the merged user should be returned from "render"
      expect(rendered.user).toEqual(
        expect.objectContaining({
          email: 'sheldon.cooper@caltech.edu',
          firstName: 'Leonard',
        })
      );
    });
  });

  describe('project', () => {
    const TestComponent = () => (
      <ApplicationContext
        render={({ project }) => (
          <>{project && [project.key, project.name].join(' ')}</>
        )}
      />
    );

    it('should render with defaults', async () => {
      const rendered = renderApp(<TestComponent />);
      await rendered.findByText('test-with-big-data Test with big data');
      // the project should be returned from "render"
      expect(rendered.project).toEqual(
        expect.objectContaining({
          key: 'test-with-big-data',
          version: 43,
          name: 'Test with big data',
          countries: ['de', 'en'],
          currencies: ['EUR', 'GBP'],
          languages: ['de', 'en-GB', 'en'],
          owner: {
            id: 'organization-id-1',
            name: 'Organization Name',
          },
        })
      );
    });

    it('should respect project overwrites', async () => {
      const rendered = renderApp(<TestComponent />, {
        project: { name: 'Geek' },
      });
      // shows that data gets merged and overwrites have priority
      await rendered.findByText('test-with-big-data Geek');
      // the merged project should be returned from "render"
      expect(rendered.project).toEqual(
        expect.objectContaining({
          key: 'test-with-big-data',
          name: 'Geek',
        })
      );
    });
  });

  describe('permissions', () => {
    const TestComponent = () => (
      <RestrictedByPermissions permissions={['ManageProducts']}>
        {({ isAuthorized }) => (isAuthorized ? 'Authorized' : 'Not allowed')}
      </RestrictedByPermissions>
    );
    it('should render unauthorized when ManageProducts permission is false', async () => {
      const rendered = renderApp(<TestComponent />, {
        permissions: { canManageProducts: false },
      });
      await rendered.findByText('Not allowed');
    });
    it('should render authorized when ManageProducts permission is true', async () => {
      const rendered = renderApp(<TestComponent />, {
        permissions: { canManageProducts: true },
      });
      await rendered.findByText('Authorized');
    });
  });

  describe('dataLocale', () => {
    const TestComponent = () => (
      <ApplicationContext render={({ dataLocale }) => dataLocale} />
    );
    it('should add the locale to the project', async () => {
      const rendered = renderApp(<TestComponent />, { dataLocale: 'de' });
      await rendered.findByText('de');
    });
  });

  describe('environment', () => {
    const TestComponent = () => (
      <ApplicationContext
        render={({ environment }) =>
          [environment.location, environment.env].join(' ')
        }
      />
    );

    it('should render with defaults', async () => {
      const rendered = renderApp(<TestComponent />);
      // shows that data gets merged and overwrites have priority
      await rendered.findByText('eu production');
      // the project should be returned from "render"
      expect(rendered.environment).toEqual(
        expect.objectContaining({
          frontendHost: 'localhost:3001',
          mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
          location: 'eu',
          env: 'production',
          cdnUrl: 'http://localhost:3001',
          servedByProxy: false,
        })
      );
    });

    it('should respect user overwrites', async () => {
      const rendered = renderApp(<TestComponent />, {
        environment: { location: 'us' },
      });
      // shows that data gets merged and overwrites have priority
      await rendered.findByText('us production');
      // the merged project should be returned from "render"
      expect(rendered.environment).toEqual(
        expect.objectContaining({
          frontendHost: 'localhost:3001',
          location: 'us',
        })
      );
    });
  });
});

describe('router', () => {
  const TestComponent = () => (
    <Switch>
      <Route path="/foo" render={() => 'Foo'} />
      {/* Define a catch-all route */}
      <Route render={() => 'None'} />
    </Switch>
  );
  it('should render fallback when no route is provided', async () => {
    const rendered = renderApp(<TestComponent />);
    await rendered.findByText('None');
    expect(rendered.queryByText('Foo')).not.toBeInTheDocument();
  });
  it('should render the route when a route is provided', async () => {
    const rendered = renderApp(<TestComponent />, { route: '/foo' });
    await rendered.findByText('Foo');
    expect(rendered.queryByText('None')).not.toBeInTheDocument();
  });
  it('should return a history object', async () => {
    const rendered = renderApp(<TestComponent />, { route: '/foo' });
    await waitFor(() => {
      expect(rendered.history.location.pathname).toBe('/foo');
    });
  });
});

describe('custom render functions', () => {
  describe('with wrapper', () => {
    const Context = React.createContext('');
    const ProvidedWrapper = ({ children }: { children?: React.ReactNode }) => (
      <Context.Provider value="provided wrapper">{children}</Context.Provider>
    );
    ProvidedWrapper.propTypes = {
      children: PropTypes.node.isRequired,
    };

    it('should merge the passed wrapper with renderApp internal wrapper', async () => {
      const TestComponent = () => {
        // provided wrapper
        const value = React.useContext(Context);
        // own wrapper
        useIntl();

        return <>{value}</>;
      };

      const rendered = renderApp(<TestComponent />, {
        wrapper: ProvidedWrapper,
      });
      await rendered.findByText(/provided wrapper/i);
    });

    it('should merge the passed wrapper with renderAppWithRedux internal wrapper', async () => {
      const TestComponent = () => {
        // provided wrapper
        const value = React.useContext(Context);
        // own wrapper
        useSelector(() => undefined);

        return <>{value}</>;
      };

      const rendered = renderAppWithRedux(<TestComponent />, {
        wrapper: ProvidedWrapper,
      });
      await rendered.findByText(/provided wrapper/i);
    });
  });

  describe('without wrapper', () => {
    it('should work with renderApp', async () => {
      const TestComponent = (props: { children: React.ReactNode }) => (
        <>{props.children}</>
      );

      const rendered = renderApp(<TestComponent>{'one'}</TestComponent>);
      await rendered.findByText('one');
    });
    it('should work with renderAppWithRedux', async () => {
      const TestComponent = (props: { children: React.ReactNode }) => (
        <>{props.children}</>
      );

      const rendered = renderAppWithRedux(
        <TestComponent>{'one'}</TestComponent>
      );
      await rendered.findByText('one');
    });
  });

  describe('rerender', () => {
    it('should work with renderApp', async () => {
      const TestComponent = (props: { children: React.ReactNode }) => {
        // the error won't be triggered unless one of the providers is used
        useIntl();
        return <>{props.children}</>;
      };

      const rendered = renderApp(<TestComponent>{'one'}</TestComponent>);
      await rendered.findByText('one');

      rendered.rerender(<TestComponent>{'two'}</TestComponent>);
      await rendered.findByText('two');
      expect(rendered.queryByText('one')).not.toBeInTheDocument();
    });

    it('should work with renderAppWithRedux', async () => {
      const TestComponent = (props: { children: React.ReactNode }) => {
        // the error won't be triggered unless one of the providers is used
        useSelector(() => undefined);
        return <>{props.children}</>;
      };

      const rendered = renderAppWithRedux(
        <TestComponent>{'one'}</TestComponent>
      );
      await rendered.findByText('one');

      rendered.rerender(<TestComponent>{'two'}</TestComponent>);
      await rendered.findByText('two');
      expect(rendered.queryByText('one')).not.toBeInTheDocument();
    });

    it('should work with experimentalRenderAppWithRedux', async () => {
      const TestComponent = (props: { children: React.ReactNode }) => {
        // the error won't be triggered unless one of the providers is used
        new ApolloClient({
          link: new HttpLink({
            uri: 'http://localhost:4000/',
          }),
          cache: new InMemoryCache(),
        });
        return <>{props.children}</>;
      };

      const rendered = experimentalRenderAppWithRedux(
        <TestComponent>{'one'}</TestComponent>
      );
      await rendered.findByText('one');

      rendered.rerender(<TestComponent>{'two'}</TestComponent>);
      await rendered.findByText('two');
      expect(rendered.queryByText('one')).not.toBeInTheDocument();
    });
  });
});
