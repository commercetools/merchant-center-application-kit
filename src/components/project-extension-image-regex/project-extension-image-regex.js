import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import { Query } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import FetchProjectExtensionImageRegex from './fetch-project-extension-image-regex.graphql';

const defaultImageRegex = {};

const { Provider, Consumer } = React.createContext(defaultImageRegex);

const ProjectExtensionProviderForImageRegex = props => (
  <Query
    query={FetchProjectExtensionImageRegex}
    variables={{ target: GRAPHQL_TARGETS.SETTINGS_SERVICE }}
  >
    {({ loading, data }) => (
      <Provider
        value={{
          loading,
          imageRegex:
            data && data.projectExtension && data.projectExtension.imageRegex,
        }}
      >
        {props.children}
      </Provider>
    )}
  </Query>
);
ProjectExtensionProviderForImageRegex.displayName =
  'ProjectExtensionProviderForImageRegex';
ProjectExtensionProviderForImageRegex.propTypes = {
  children: PropTypes.node.isRequired,
};

const GetProjectExtensionImageRegex = props => (
  <Consumer>{imageRegex => props.render(imageRegex)}</Consumer>
);
GetProjectExtensionImageRegex.displayName = 'GetProjectExtensionImageRegex';
GetProjectExtensionImageRegex.propTypes = {
  render: PropTypes.func.isRequired,
};

const withProjectExtensionImageRegex = (
  propKey = 'imageRegex'
) => Component => {
  const WrappedComponent = props => (
    <GetProjectExtensionImageRegex
      render={imageRegex => (
        <Component {...props} {...{ [propKey]: imageRegex }} />
      )}
    />
  );
  WrappedComponent.displayName = wrapDisplayName(
    Component,
    'withProjectExtensionImageRegex'
  );
  return WrappedComponent;
};

// Exports
export default GetProjectExtensionImageRegex;
export {
  ProjectExtensionProviderForImageRegex,
  withProjectExtensionImageRegex,
};
