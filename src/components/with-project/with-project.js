import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
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
};

const WithProject = props => {
  const mappedProps = props.mapDataToProps
    ? props.mapDataToProps(props.projectData)
    : props.projectData;
  return props.children(mappedProps);
};
WithProject.displayName = 'WithProject';
WithProject.propTypes = {
  projectKey: PropTypes.string.isRequired,
  mapDataToProps: PropTypes.func,
  children: PropTypes.func.isRequired,
  // Injected
  projectData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    project: PropTypes.object, // see graphql query shape
  }).isRequired,
};

// React component
const WithProjectData = compose(
  setDisplayName('WithProject'),
  graphql(ProjectQuery, graphqlOptions)
)(WithProject);

// HoC
const withProject = (getProjectKey, mapDataToProps) => Component => {
  const WrappedWithProject = props => (
    <WithProjectData
      projectKey={getProjectKey(props)}
      mapDataToProps={mapDataToProps}
    >
      {mappedProps => <Component {...props} {...mappedProps} />}
    </WithProjectData>
  );
  WrappedWithProject.displayName = 'WithProject';
  return WrappedWithProject;
};

// Public exports
export default WithProjectData;
export { withProject };

// For testing
export { ProjectQuery, WithProject };
