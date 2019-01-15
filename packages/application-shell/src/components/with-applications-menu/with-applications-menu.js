import React from 'react';
import { Query } from 'react-apollo';
import { wrapDisplayName } from 'recompose';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import FetchApplicationsMenu from './fetch-applications-menu.graphql';

const defaultApiUrl = window.location.origin;

function withApplicationsMenu(getOptions) {
  if (process.env.NODE_ENV === 'development') {
    return Component => {
      class WrappedComponent extends React.Component {
        static displayName = wrapDisplayName(Component, 'withApplicationsMenu');
        state = {
          menu: null,
        };
        getDevConfig = () => {
          const { __DEV_CONFIG__: devConfig } = getOptions(this.props);
          if (!devConfig) {
            throw new Error(
              'In development mode, you need to pass `__DEV_CONFIG__` options to `withApplicationsMenu`.'
            );
          }
          return devConfig;
        };
        componentDidMount() {
          const devConfig = this.getDevConfig();
          if (devConfig.menuLoader) {
            devConfig.menuLoader().then(menu => this.setState({ menu }));
          }
        }
        render() {
          const devConfig = this.getDevConfig();
          const { queryName } = getOptions(this.props);
          const fakeGraphqlResponse = this.state.menu
            ? {
                [queryName]: {
                  applicationsMenu: {
                    [devConfig.menuKey]: Array.isArray(this.state.menu)
                      ? this.state.menu
                      : [this.state.menu],
                  },
                },
              }
            : {};
          return <Component {...this.props} {...fakeGraphqlResponse} />;
        }
      }
      return WrappedComponent;
    };
  }
  return Component => {
    const WrappedComponent = props => {
      const { queryName, queryOptions = {} } = getOptions(props);
      return (
        <ApplicationContext
          render={({ environment }) => (
            <Query
              query={FetchApplicationsMenu}
              fetchPolicy={queryOptions.fetchPolicy || 'cache-first'}
              context={{
                // Allow to overwrite the API url from `env.json`
                uri: `${environment.mcProxyApiUrl ||
                  defaultApiUrl}/api/graphql`,
              }}
            >
              {({ data, error }) => (
                <Component
                  {...props}
                  {...{ [queryName]: { ...data, error } }}
                />
              )}
            </Query>
          )}
        />
      );
    };
    WrappedComponent.displayName = wrapDisplayName(
      Component,
      'withApplicationsMenu'
    );
    return WrappedComponent;
  };
}

export default withApplicationsMenu;
