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
import deprecateComponent from '../../from-core/deprecate-component';
import ProjectQuery from './fetch-project.graphql';

/**
 * NOTE:
 *
 * Permissions are being fetched though the `allAppliedPermissions` which
 * is an array of `{ name: string, value: boolean }`. This gives more
 * flexibility to introduce new permissions to apps without having to release
 * the merchant-center-app-kit.
 *
 * The application below however expects permissions to be of the shape
 * `[name: string]: boolean` which is what the shape above is mapped into here.
 *
 * This function by concern belongs into the `permissions` package. However,
 * for now it doesn't have to be shared and as a result can be co-located with
 * the fetching logic. Given this mapping needs to be used elsewere feel free
 * to move this over to `permissions` and export it there.
 */
export const mapAppliedPermissionsToPermissions = allAppliedPermissions =>
  allAppliedPermissions.reduce(
    (transfromedPermissions, appliedPermission) => ({
      ...transfromedPermissions,
      [appliedPermission.name]: appliedPermission.value,
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
        permissions: mapAppliedPermissionsToPermissions(
          projectData.project.allAppliedPermissions
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

// Exports with deprecated warnings
const DeprecatedFetchProject = deprecateComponent({
  message:
    'The "FetchProject" component has been deprecated and will be removed in the next major release. Please use "ApplicationContext" from `@commercetools-frontend/application-shell-connectors` to access "user" and "project" information.',
})(FetchProjectData);
const deprecatedWithProject = (getProjectKey, mapDataToProps) => Component => {
  const WrappedComponent = withProject(getProjectKey, mapDataToProps)(
    Component
  );
  return deprecateComponent({
    message:
      'The "withProject" HOC has been deprecated and will be removed in the next major release. Please use "withApplicationContext" from `@commercetools-frontend/application-shell-connectors` to access "user" and "project" information.',
  })(WrappedComponent);
};
export { DeprecatedFetchProject, deprecatedWithProject };
