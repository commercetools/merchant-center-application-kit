// This file tests our test-utils file #inception
//
// The TestComponents are expected to work. We run the tests to ensure that
// the `render` method sets up the tests correctly.
// This is a bit different from our usual tests, as we are testing our testing
// tools here instead of actual components.
import React from 'react';
import { injectIntl } from 'react-intl';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { injectFeatureToggle } from '@flopflip/react-broadcast';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { RestrictedByPermissions } from '@commercetools-frontend/permissions';
import { Switch, Route } from 'react-router';
import { renderApp, wait } from './test-utils';

describe('Intl', () => {
  const TestComponent = injectIntl(props => props.intl.locale);
  it('should have intl', () => {
    const { container } = renderApp(<TestComponent />);
    expect(container).toHaveTextContent('en');
  });
  it('should be possible to overwrite', () => {
    const { container } = renderApp(<TestComponent />, {
      locale: 'de',
    });
    expect(container).toHaveTextContent('de');
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
  const TestComponent = () => (
    <Query query={SomeQuery} variables={{ target: 'ctp' }}>
      {payload => {
        if (!payload || !payload.data || !payload.data.foo) return 'loading';
        return payload.data.foo.name;
      }}
    </Query>
  );
  it('should be possible to fake GraphQL requests', async () => {
    const { container } = renderApp(<TestComponent />, {
      mocks: [
        {
          request: {
            query: SomeQuery,
            variables: { target: 'ctp' },
          },
          result: { data: { foo: { name: 'Snoop Dogg' } } },
        },
      ],
    });
    expect(container).toHaveTextContent('loading');
    await wait(() => {
      expect(container).toHaveTextContent('Snoop Dogg');
    });
  });
});

describe('FlopFlip', () => {
  const FEATURE_NAME = 'foo-bar';
  const TestComponent = injectFeatureToggle(FEATURE_NAME, 'isFooBarEnabled')(
    props => (props.isFooBarEnabled ? 'enabled' : 'disabled')
  );
  it('should not have feature toggles by default', () => {
    const { container } = renderApp(<TestComponent />);
    expect(container).toHaveTextContent('disabled');
  });
  it('should be possible to provide feature toggles', () => {
    const { container } = renderApp(<TestComponent />, {
      flags: { [FEATURE_NAME]: true },
    });
    expect(container).toHaveTextContent('enabled');
  });
});

describe('ApplicationContext', () => {
  describe('user', () => {
    const TestComponent = () => (
      <ApplicationContext
        render={({ user }) => [user.firstName, user.lastName].join(' ')}
      />
    );

    it('should render with defaults', () => {
      const { container, user } = renderApp(<TestComponent />);
      expect(container).toHaveTextContent('Sheldon Cooper');
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

    it('should respect user overwrites', () => {
      const { container, user } = renderApp(<TestComponent />, {
        user: { firstName: 'Leonard' },
      });
      // shows that data gets merged and overwrites have priority
      expect(container).toHaveTextContent('Leonard Cooper');
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
        render={({ project }) => [project.key, project.name].join(' ')}
      />
    );

    it('should render with defaults', () => {
      const { container, project } = renderApp(<TestComponent />);
      expect(container).toHaveTextContent(
        'test-with-big-data Test with big data'
      );
      // the project should be returned from "render"
      expect(project).toEqual(
        expect.objectContaining({
          key: 'test-with-big-data',
          version: 43,
          name: 'Test with big data',
          countries: ['de', 'en'],
          currencies: ['EUR', 'GBP'],
          languages: ['de', 'en-GB'],
          owner: {
            id: 'project-id-1',
          },
        })
      );
    });

    it('should respect project overwrites', () => {
      const { container, project } = renderApp(<TestComponent />, {
        project: { name: 'Geek' },
      });
      // shows that data gets merged and overwrites have priority
      expect(container).toHaveTextContent('test-with-big-data Geek');
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
    it('should have all permissions by default', () => {
      const { container } = renderApp(<TestComponent />);
      expect(container).toHaveTextContent('Authorized');
    });
    it('should allow overwriting permissions', () => {
      const { container } = renderApp(<TestComponent />, {
        permissions: { canManageProducts: false },
      });
      expect(container).toHaveTextContent('Not allowed');
    });
  });

  describe('dataLocale', () => {
    const TestComponent = () => (
      <ApplicationContext render={({ dataLocale }) => dataLocale} />
    );
    it('should add the locale to the project', () => {
      const { container } = renderApp(<TestComponent />, { dataLocale: 'de' });
      expect(container).toHaveTextContent('de');
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

    it('should render with defaults', () => {
      const { container, environment } = renderApp(<TestComponent />);
      // shows that data gets merged and overwrites have priority
      expect(container).toHaveTextContent('eu production');
      // the project should be returned from "render"
      expect(environment).toEqual(
        expect.objectContaining({
          frontendHost: 'localhost:3001',
          mcApiUrl: 'https://mc-api.commercetools.com',
          location: 'eu',
          env: 'production',
          cdnUrl: 'http://localhost:3001',
          servedByProxy: false,
        })
      );
    });

    it('should respect user overwrites', () => {
      const { container, environment } = renderApp(<TestComponent />, {
        environment: { location: 'us' },
      });
      // shows that data gets merged and overwrites have priority
      expect(container).toHaveTextContent('us production');
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
      <Route path="/foo" render={() => 'Foo'} />
      {/* Define a catch-all route */}
      <Route render={() => 'None'} />
    </Switch>
  );
  it('should render fallback when no route is provided', () => {
    const { container } = renderApp(<TestComponent />);
    expect(container).not.toHaveTextContent('Foo');
    expect(container).toHaveTextContent('None');
  });
  it('should render the route when a route is provided', () => {
    const { container } = renderApp(<TestComponent />, { route: '/foo' });
    expect(container).toHaveTextContent('Foo');
    expect(container).not.toHaveTextContent('None');
  });
  it('should return a history object', () => {
    const { history } = renderApp(<TestComponent />, { route: '/foo' });
    expect(history.location.pathname).toBe('/foo');
  });
});
