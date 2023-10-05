// This file tests our test-utils file #inception
//
// The TestComponents are expected to work. We run the tests to ensure that
// the `render` method sets up the tests correctly.
// This is a bit different from our usual tests, as we are testing our testing
// tools here instead of actual components.
import { graphql } from 'msw';
import { createContext, ReactNode, useContext } from 'react';
import { gql } from '@apollo/client';
import { useFeatureToggle } from '@flopflip/react-broadcast';
import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { useIntl } from 'react-intl';
import { useSelector, useStore } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {
  ApplicationContext,
  useMcQuery,
} from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import {
  type TRenderAppWithReduxOptions,
  renderApp,
  renderAppWithRedux,
  waitFor,
  denormalizePermissions,
} from './test-utils';

const mockServer = setupServer();
afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());

const createDefaultOptions = (
  customOptions: Partial<TRenderAppWithReduxOptions> = {}
): Partial<TRenderAppWithReduxOptions> => ({
  disableRoutePermissionCheck: true,
  ...customOptions,
});

describe('Intl', () => {
  const TestComponent = () => {
    const intl = useIntl();
    return <span>{intl.locale}</span>;
  };
  it('should have intl', async () => {
    renderApp(<TestComponent />, createDefaultOptions());
    await screen.findByText('en');
  });
  it('should be possible to overwrite', async () => {
    renderApp(
      <TestComponent />,
      createDefaultOptions({
        locale: 'de',
      })
    );
    await screen.findByText('de');
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
    renderApp(
      <TestComponent />,
      createDefaultOptions({
        mocks: [
          {
            request: {
              query: SomeQuery,
              context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
            },
            result: { data: { foo: { name: 'Snoop Dogg' } } },
          },
        ],
      })
    );
    await screen.findByText('Snoop Dogg');
  });
});

describe('Real ApolloProvider', () => {
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
    mockServer.use(
      graphql.query('Wow', (_req, res, ctx) =>
        res(ctx.data({ foo: { name: 'Snoop Dogg' } }))
      )
    );
    renderApp(<TestComponent />, createDefaultOptions());
    await screen.findByText('Snoop Dogg');
  });
});

describe('`flopflip`', () => {
  const FEATURE_NAME = 'fooBar';
  const TestComponent = () => {
    const isFeatureEnabled = useFeatureToggle(FEATURE_NAME);
    return <p>Enabled: {isFeatureEnabled ? 'Yes' : 'No'}</p>;
  };
  it('should not enable features toggles by default', async () => {
    renderApp(<TestComponent />, createDefaultOptions());
    await screen.findByText(/Enabled: No/i);
  });
  it('should be possible to enable feature toggles', async () => {
    renderApp(
      <TestComponent />,
      createDefaultOptions({
        flags: { [FEATURE_NAME]: true },
      })
    );
    await screen.findByText(/Enabled: Yes/i);
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
      const { user } = renderApp(<TestComponent />, createDefaultOptions());
      await screen.findByText('Sheldon Cooper');
      // the user should be returned from "render"
      expect(user).toEqual(
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
      const { user } = renderApp(
        <TestComponent />,
        createDefaultOptions({
          user: { firstName: 'Leonard' },
        })
      );
      // shows that data gets merged and overwrites have priority
      await screen.findByText('Leonard Cooper');
      // the merged user should be returned from "render"
      expect(user).toEqual(
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
      const { project } = renderApp(<TestComponent />, createDefaultOptions());
      await screen.findByText('test-with-big-data Test with big data');
      // the project should be returned from "render"
      expect(project).toEqual(
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
      const { project } = renderApp(
        <TestComponent />,
        createDefaultOptions({
          project: { name: 'Geek' },
        })
      );
      // shows that data gets merged and overwrites have priority
      await screen.findByText('test-with-big-data Geek');
      // the merged project should be returned from "render"
      expect(project).toEqual(
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
      renderApp(
        <TestComponent />,
        createDefaultOptions({
          project: {
            allAppliedPermissions: denormalizePermissions({
              canManageProducts: false,
            }),
          },
        })
      );
      await screen.findByText('Not allowed');
    });
    it('should render authorized when ManageProducts permission is true', async () => {
      renderApp(
        <TestComponent />,
        createDefaultOptions({
          project: {
            allAppliedPermissions: denormalizePermissions({
              canManageProducts: true,
            }),
          },
        })
      );
      await screen.findByText('Authorized');
    });
  });

  describe('dataLocale', () => {
    const TestComponent = () => (
      <ApplicationContext render={({ dataLocale }) => dataLocale} />
    );
    it('should add the locale to the project', async () => {
      renderApp(<TestComponent />, createDefaultOptions({ dataLocale: 'de' }));
      await screen.findByText('de');
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
      const { environment } = renderApp(
        <TestComponent />,
        createDefaultOptions()
      );
      // shows that data gets merged and overwrites have priority
      await screen.findByText('eu production');
      // the project should be returned from "render"
      expect(environment).toEqual(
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
      const { environment } = renderApp(
        <TestComponent />,
        createDefaultOptions({
          environment: { location: 'us' },
        })
      );
      // shows that data gets merged and overwrites have priority
      await screen.findByText('us production');
      // the merged project should be returned from "render"
      expect(environment).toEqual(
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
      <Route path="/foo/avengers">{'Foo'}</Route>
      {/* Define a catch-all route */}
      <Route>{'None'}</Route>
    </Switch>
  );
  it('should render fallback when no route is provided', async () => {
    renderApp(<TestComponent />, createDefaultOptions());
    await screen.findByText('None');
    expect(screen.queryByText('Foo')).not.toBeInTheDocument();
  });
  it('should render the route when a route is provided', async () => {
    renderApp(
      <TestComponent />,
      createDefaultOptions({
        route: '/foo/avengers',
        environment: { entryPointUriPath: 'avengers' },
      })
    );
    await screen.findByText('Foo');
    expect(screen.queryByText('None')).not.toBeInTheDocument();
  });
  it('should return a history object', async () => {
    const { history } = renderApp(
      <TestComponent />,
      createDefaultOptions({
        route: '/foo/avengers',
        environment: { entryPointUriPath: 'avengers' },
      })
    );
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foo/avengers');
    });
  });
});

describe('custom render functions', () => {
  describe('with wrapper', () => {
    const Context = createContext('');
    const ProvidedWrapper = ({ children }: { children?: ReactNode }) => (
      <Context.Provider value="provided wrapper">{children}</Context.Provider>
    );

    it('should merge the passed wrapper with renderApp internal wrapper', async () => {
      const TestComponent = () => {
        // provided wrapper
        const value = useContext(Context);
        // own wrapper
        useIntl();

        return <>{value}</>;
      };

      renderApp(
        <TestComponent />,
        createDefaultOptions({
          wrapper: ProvidedWrapper,
        })
      );
      await screen.findByText(/provided wrapper/i);
    });

    it('should merge the passed wrapper with renderAppWithRedux internal wrapper', async () => {
      const TestComponent = () => {
        // provided wrapper
        const value = useContext(Context);
        // own wrapper
        useSelector(() => undefined);

        return <>{value}</>;
      };

      renderAppWithRedux(
        <TestComponent />,
        createDefaultOptions({
          wrapper: ProvidedWrapper,
        })
      );
      await screen.findByText(/provided wrapper/i);
    });
  });

  describe('without wrapper', () => {
    it('should work with renderApp', async () => {
      const TestComponent = (props: { children: ReactNode }) => (
        // eslint-disable-next-line testing-library/no-node-access
        <>{props.children}</>
      );

      renderApp(<TestComponent>{'one'}</TestComponent>, createDefaultOptions());
      await screen.findByText('one');
    });
    it('should work with renderAppWithRedux', async () => {
      const TestComponent = (props: { children: ReactNode }) => (
        // eslint-disable-next-line testing-library/no-node-access
        <>{props.children}</>
      );

      renderAppWithRedux(
        <TestComponent>{'one'}</TestComponent>,
        createDefaultOptions()
      );
      await screen.findByText('one');
    });
  });

  describe('rerender', () => {
    it('should work with renderApp', async () => {
      const TestComponent = (props: { children: ReactNode }) => {
        // the error won't be triggered unless one of the providers is used
        useIntl();
        // eslint-disable-next-line testing-library/no-node-access
        return <>{props.children}</>;
      };

      const { rerender } = renderApp(
        <TestComponent>{'one'}</TestComponent>,
        createDefaultOptions()
      );
      await screen.findByText('one');

      rerender(<TestComponent>{'two'}</TestComponent>);
      await screen.findByText('two');
      expect(screen.queryByText('one')).not.toBeInTheDocument();
    });

    it('should work with renderAppWithRedux', async () => {
      const TestComponent = (props: { children: ReactNode }) => {
        // the error won't be triggered unless one of the providers is used
        useSelector(() => undefined);
        // eslint-disable-next-line testing-library/no-node-access
        return <>{props.children}</>;
      };

      const { rerender } = renderAppWithRedux(
        <TestComponent>{'one'}</TestComponent>,
        createDefaultOptions()
      );
      await screen.findByText('one');

      rerender(<TestComponent>{'two'}</TestComponent>);
      await screen.findByText('two');
      expect(screen.queryByText('one')).not.toBeInTheDocument();
    });
  });
});

describe('renderAppWithRedux', () => {
  it('should be able to use storeState render option', () => {
    const TestComponent = () => {
      const store = useStore();
      const state = store.getState();
      return state.products.currentVisible.id;
    };
    renderAppWithRedux(
      <TestComponent />,
      createDefaultOptions({
        storeState: {
          products: {
            currentVisible: {
              id: 'current-visible-product-id',
            },
          },
        },
      })
    );
    expect(screen.getByText(/current-visible-product-id/i)).toBeInTheDocument();
  });
});
