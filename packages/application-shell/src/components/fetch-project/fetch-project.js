import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  getDisplayName,
  setDisplayName,
  shouldUpdate,
} from 'recompose';
import { deepEqual } from 'fast-equals';
import { graphql } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import ProjectQuery from './fetch-project.graphql';

/**
 * NOTE:
 *
 * Permissions and menu visibilities are being fetched though the `allAppliedPermissions`
 * and the `allAppliedMenuVisibilities` which both return an array of `{ name: string, value: boolean }`.
 * This gives more flexibility to introduce new values to apps without having to release
 * the merchant-center-app-kit by adding/exposing them from the mc-be (our proxy service).
 *
 * The application below however expects both permissions an menu visibilities to be of the shape
 * `[name: string]: boolean` which is what the shape above is mapped into here. This object shape is easier
 * to work with in application level code (while be a non breaking change to other packages) as you can just
 * do `permissions.canViewProducts`.
 *
 * This function considering its concern belongs into the `permissions` package. However,
 * for now it doesn't have to be shared and as a result can be co-located with
 * the fetching logic. Given this mapping needs to be used elsewere feel free
 * to move this over to `permissions` and export it there.
 */
export const mapAllAppliedToObjectShape = allAppliedShape =>
  allAppliedShape.reduce(
    (transformedAllApplied, allApplied) => ({
      ...transformedAllApplied,
      [allApplied.name]: allApplied.value,
    }),
    {}
  );

const graphqlOptions = {
  alias: 'withProject',
  name: 'projectData',
  options: ownProps => ({
    variables: {
      target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      projectKey: ownProps.projectKey,
    },
  }),
  // Rename `loading` -> `isLoading`, to follow our naming convention
  // https://github.com/commercetools/merchant-center-frontend/issues/2701
  props: ({ projectData }) => ({
    projectData: {
      isLoading: projectData.loading,
      error: projectData.error,
      project: projectData.project && {
        ...projectData.project,
        permissions: mapAllAppliedToObjectShape(
          projectData.project.allAppliedPermissions
        ),
        menuVisibilities: mapAllAppliedToObjectShape(
          projectData.project.allAppliedMenuVisibilities
        ),
      },
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
  graphql(ProjectQuery, graphqlOptions),
  // a render is triggered because the reference of the userData prop changes
  // although the objects content didn't change
  shouldUpdate((props, nextProps) => !deepEqual(props, nextProps))
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
