import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import omit from 'lodash.omit';

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
`;

const graphqlOptions = {
  alias: 'withProject',
  name: 'projectData',
};

const WithProject = props => {
  const mappedProps = props.mapDataToProps
    ? props.mapDataToProps(props.projectData)
    : { projectData: props.projectData };
  // Extract props coming from parents and omit props specific to this
  // component, then pass them down to the children.
  const parentProps = omit(props, [
    'projectKey',
    'mapDataToProps',
    'render',
    'projectData',
  ]);
  return props.render({ ...parentProps, ...mappedProps });
};
WithProject.displayName = 'WithProject';
WithProject.propTypes = {
  projectKey: PropTypes.string.isRequired,
  mapDataToProps: PropTypes.func,
  render: PropTypes.func.isRequired,
  // Injected
  projectData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    project: PropTypes.object, // see graphql query shape
  }).isRequired,
};

// React component
const WithUserProject = compose(
  setDisplayName('WithProject'),
  graphql(ProjectQuery, graphqlOptions)
)(WithProject);

// HoC
const withProject = (getProjectKey, mapDataToProps) => Component => {
  const WrappedWithProject = props => (
    <WithUserProject
      projectKey={getProjectKey(props)}
      mapDataToProps={mapDataToProps}
      render={mappedProps => <Component {...props} {...mappedProps} />}
    />
  );
  WrappedWithProject.displayName = 'WithProject';
  return WrappedWithProject;
};

// Public exports
export default WithUserProject;
export { withProject };

// For testing
export { ProjectQuery, WithProject };
