import React from 'react';
import PropTypes from 'prop-types';
import { compose, getDisplayName, setDisplayName } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const ProjectQuery = gql`
  query Project($projectKey: String!) {
    project(key: $projectKey) {
      id
      key
      name
      countries
      currencies
      languages
      expired
      suspended
      permissions {
        canManageOrganization
        canManageProject
        canViewProjectSettings
        canViewProducts
        canManageProducts
        canViewOrders
        canManageOrders
        canViewCustomers
        canManageCustomers
        canViewTypes
        canManageTypes
        canViewShippingLists
        canManageShippingLists
        canViewPayments
        canManagePayments
      }
      owner {
        id
        name
        createdAt
        teamsCount
      }
      settings {
        id
        baseSettings {
          id
          userProjectSettings
          pluginPreset
          imageRegex {
            thumb {
              ...ImageRegex
            }
            small {
              ...ImageRegex
            }
          }
          orderStatesVisibility {
            isPaymentStateHidden
            isShipmentStateHidden
            isOrderStateHidden
          }
          categoryRecommendationSettings {
            searchProperty
            options {
              attributeName
            }
          }
        }
        productSettings
        currentProductSettings
      }
    }
  }

  fragment ImageRegex on ImageRegexOptions {
    flag
    search
    replace
  }
`;

const graphqlOptions = {
  alias: 'withProject',
  name: 'projectData',
  options: ownProps => ({
    variables: {
      target: 'mc',
      projectKey: ownProps.projectKey,
    },
  }),
  // Rename `loading` -> `isLoading`, to follow our naming convention
  // https://github.com/commercetools/merchant-center-frontend/issues/2701
  props: ({ projectData }) => ({
    projectData: {
      isLoading: projectData.loading,
      error: projectData.error,
      project: projectData.project,
    },
  }),
};

const FetchProject = props => props.children(props.projectData);
FetchProject.displayName = 'FetchProject';
FetchProject.propTypes = {
  projectKey: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  // Injected
  projectData: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    project: PropTypes.object, // see graphql query shape
  }).isRequired,
};

// React component
const FetchProjectData = compose(
  setDisplayName('FetchProject'),
  graphql(ProjectQuery, graphqlOptions)
)(FetchProject);

// HoC
const withProject = (getProjectKey, mapDataToProps) => Component => {
  const WrappedWithProject = props => (
    <FetchProjectData projectKey={getProjectKey(props)}>
      {projectData => {
        const mappedProps = mapDataToProps
          ? mapDataToProps(projectData)
          : projectData;
        return <Component {...props} {...mappedProps} />;
      }}
    </FetchProjectData>
  );
  WrappedWithProject.displayName = `withProject(${getDisplayName(Component)})`;
  return WrappedWithProject;
};

// Public exports
export default FetchProjectData;
export { withProject };

// For testing
export { ProjectQuery, FetchProject };
