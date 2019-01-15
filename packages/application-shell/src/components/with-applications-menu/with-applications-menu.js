import React from 'react';
import { Query } from 'react-apollo';
import { wrapDisplayName } from 'recompose';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import FetchApplicationsMenu from './fetch-applications-menu.graphql';

const defaultApiUrl = window.location.origin;

function withApplicationsMenu(getOptions) {
  if (process.env.NODE_ENV !== 'development') {
    return Component => {
      class WrappedComponent extends React.Component {
        static displayName = wrapDisplayName(Component, 'withApplicationsMenu');
        state = {
          menu: null,
        };
        getConfig = () => {
          const { __DEV_CONFIG__: devConfig } = getOptions(this.props);
          if (!devConfig) {
            throw new Error(
              'In development mode, you need to pass `__DEV_CONFIG__` options to `withApplicationsMenu`.'
            );
          }
          return devConfig;
        };
        componentDidMount() {
          const devConfig = this.getConfig();
          if (devConfig.menuLoader) {
            devConfig.menuLoader().then(
              menu => this.setState({ menu }),
              error => {
                console.error('Failed to load menu.json in development', error);
              }
            );
          }
        }
        render() {
          const devConfig = this.getConfig();
          const fakeGraphqlResponse = this.state.menu
            ? {
                applicationsMenuQuery: {
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
    const WrappedComponent = props => (
      <ApplicationContext
        render={({ environment }) => (
          <Query
            query={FetchApplicationsMenu}
            fetchPolicy={getOptions(props).fetchPolicy || 'cache-first'}
            context={{
              // Allow to overwrite the API url from `env.json`
              uri: `${environment.mcProxyApiUrl || defaultApiUrl}/api/graphql`,
            }}
          >
            {({ data }) => (
              <Component {...props} applicationsMenuQuery={data} />
            )}
          </Query>
        )}
      />
    );
    WrappedComponent.displayName = wrapDisplayName(
      Component,
      'withApplicationsMenu'
    );
    return WrappedComponent;
  };
}

export default withApplicationsMenu;
