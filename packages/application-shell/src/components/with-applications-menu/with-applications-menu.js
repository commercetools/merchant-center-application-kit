import React from 'react';
import { Query } from 'react-apollo';
import { ApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import getDisplayName from '../../utils/get-display-name';
import FetchApplicationsMenu from './fetch-applications-menu.graphql';

const defaultApiUrl = window.location.origin;

const defaultConfig = {
  queryName: 'applicationsMenuQuery',
  skipRemoteQuery: () => false,
  options: () => ({}),
};

const withApplicationsMenu = (config = {}) => Component => {
  const mergedConfig = { ...defaultConfig, ...config };
  class WrappedComponent extends React.Component {
    static displayName = `withApplicationsMenu(${getDisplayName(Component)})`;
    state = {
      menu: null,
    };
    getDevConfig = () => {
      const { __DEV_CONFIG__: devConfig } = mergedConfig.options(this.props);
      if (!devConfig) {
        throw new Error(
          'In development mode, you need to pass `__DEV_CONFIG__` options to `withApplicationsMenu`.'
        );
      }
      return devConfig;
    };
    componentDidMount() {
      if (mergedConfig.skipRemoteQuery(this.props)) {
        const devConfig = this.getDevConfig();
        if (devConfig.menuLoader) {
          devConfig.menuLoader().then(menu => this.setState({ menu }));
        }
      }
    }
    render() {
      if (mergedConfig.skipRemoteQuery(this.props)) {
        const devConfig = this.getDevConfig();
        const fakeGraphqlResponse = this.state.menu
          ? {
              [mergedConfig.queryName]: {
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

      const { queryOptions = {} } = mergedConfig.options(this.props);
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
                  {...this.props}
                  {...{ [mergedConfig.queryName]: { ...data, error } }}
                />
              )}
            </Query>
          )}
        />
      );
    }
  }
  return WrappedComponent;
};

export default withApplicationsMenu;
