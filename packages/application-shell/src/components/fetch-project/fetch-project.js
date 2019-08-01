import React from 'react';
import PropTypes from 'prop-types';
import { deepEqual } from 'fast-equals';
import { Query } from 'react-apollo';
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
 * do `canViewProducts`.
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
export const mapAllAppliedToGroupedObjectShape = allAppliedShape =>
  allAppliedShape.reduce((transformedAllApplied, allApplied) => {
    const previousAllAppliedGroup = transformedAllApplied[allApplied.group];

    return {
      ...transformedAllApplied,
      [allApplied.group]: {
        ...previousAllAppliedGroup,
        [allApplied.name]: allApplied.value,
      },
    };
  }, {});

const mapAppliedDataFencesByResourceType = dataFences => {
  const groupedByResourceType = dataFences.reduce(
    (previousGroupsOfSameType, appliedDataFence) => {
      const previousGroup = previousGroupsOfSameType[appliedDataFence.group];
      return {
        ...previousGroupsOfSameType,
        [appliedDataFence.group]: [...(previousGroup || []), appliedDataFence],
      };
    },
    {}
  );
  return Object.entries(groupedByResourceType).reduce(
    (previousGroupedByResourceType, [resourceType, dataFences]) => {
      const groupByDataFenceName = dataFences.reduce(
        (nextDataFenceValues, dataFence) => {
          const dataFenceByName = nextDataFenceValues[dataFence.name] || {
            values: [],
          };
          return {
            ...nextDataFenceValues,
            [dataFence.name]: {
              ...dataFenceByName,
              values: [...dataFenceByName.values, dataFence.value],
            },
          };
        },
        {}
      );
      return {
        ...previousGroupedByResourceType,
        [resourceType]: groupByDataFenceName,
      };
    },
    {}
  );
};

export const mapAllDataFencesToGroupedObjectShape = allAppliedDataFences => {
  const groupedByType = allAppliedDataFences.reduce(
    (previousGroupsOfSameType, appliedDataFence) => {
      const previousGroup = previousGroupsOfSameType[appliedDataFence.type];
      return {
        ...previousGroupsOfSameType,
        [appliedDataFence.type]: [...(previousGroup || []), appliedDataFence],
      };
    },
    {}
  );
  return Object.entries(groupedByType).reduce(
    (previousTransformed, [dataFenceType, dataFences]) => ({
      [dataFenceType]: {
        ...previousTransformed,
        ...mapAppliedDataFencesByResourceType(dataFences),
      },
    }),
    {}
  );
};

class FetchProject extends React.Component {
  static displayName = 'FetchProject';
  static propTypes = {
    projectKey: PropTypes.string,
    skip: PropTypes.bool,
    children: PropTypes.func.isRequired,
  };
  static defaultProps = {
    skip: false,
  };
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }
  render() {
    return (
      <Query
        query={ProjectQuery}
        variables={{
          target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
          projectKey: this.props.projectKey,
        }}
        skip={this.props.skip}
      >
        {({ data, loading, error }) =>
          this.props.children({
            isLoading: loading,
            error,
            project: data &&
              data.project && {
                ...data.project,
                permissions: mapAllAppliedToObjectShape(
                  data.project.allAppliedPermissions
                ),
                dataFences: mapAllDataFencesToGroupedObjectShape(
                  data.project.allAppliedDataFences
                ),
                actionRights: mapAllAppliedToGroupedObjectShape(
                  data.project.allAppliedActionRights
                ),
                menuVisibilities: mapAllAppliedToObjectShape(
                  data.project.allAppliedMenuVisibilities
                ),
              },
          })
        }
      </Query>
    );
  }
}
export default FetchProject;
