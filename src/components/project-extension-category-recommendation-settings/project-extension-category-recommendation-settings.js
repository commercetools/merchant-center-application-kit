import React from 'react';
import PropTypes from 'prop-types';
import { wrapDisplayName } from 'recompose';
import { Query } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import FetchProjectExtensionCategoryRecommendationSettings from './fetch-project-extension-category-recommendation-settings.graphql';

const defaultValue = {};

const { Provider, Consumer } = React.createContext(defaultValue);

const ProjectExtensionProviderForCategoryRecommendationSettings = props => (
  <Query
    query={FetchProjectExtensionCategoryRecommendationSettings}
    variables={{ target: GRAPHQL_TARGETS.SETTINGS_SERVICE }}
  >
    {({ loading, data }) => (
      <Provider
        value={{
          loading,
          categoryRecommendationSettings:
            data &&
            data.projectExtension &&
            data.projectExtension.categoryRecommendationSettings,
        }}
      >
        {props.children}
      </Provider>
    )}
  </Query>
);
ProjectExtensionProviderForCategoryRecommendationSettings.displayName =
  'ProjectExtensionProviderForCategoryRecommendationSettings';
ProjectExtensionProviderForCategoryRecommendationSettings.propTypes = {
  children: PropTypes.node.isRequired,
};

const GetProjectExtensionCategoryRecommendationSettings = props => (
  <Consumer>
    {categoryRecommendationSettingsData =>
      props.render(categoryRecommendationSettingsData)
    }
  </Consumer>
);
GetProjectExtensionCategoryRecommendationSettings.displayName =
  'GetProjectExtensionCategoryRecommendationSettings';
GetProjectExtensionCategoryRecommendationSettings.propTypes = {
  render: PropTypes.func.isRequired,
};

const withProjectExtensionCategoryRecommendationSettings = (
  propKey = 'categoryRecommendationSettingsData'
) => Component => {
  const WrappedComponent = props => (
    <GetProjectExtensionCategoryRecommendationSettings
      render={categoryRecommendationSettingsData => (
        <Component
          {...props}
          {...{ [propKey]: categoryRecommendationSettingsData }}
        />
      )}
    />
  );
  WrappedComponent.displayName = wrapDisplayName(
    Component,
    'withProjectExtensionCategoryRecommendationSettings'
  );
  return WrappedComponent;
};

// Exports
export default GetProjectExtensionCategoryRecommendationSettings;
export {
  ProjectExtensionProviderForCategoryRecommendationSettings,
  withProjectExtensionCategoryRecommendationSettings,
};
