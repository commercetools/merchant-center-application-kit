import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import ProjectQuery from './fetch-project.mc.graphql';

const FetchProject = props => {
  const { loading, data, error } = useQuery(ProjectQuery, {
    onError: error => {
      console.log('error', error);
      reportErrorToSentry(error);
    },
    variables: {
      target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      projectKey: props.projectKey,
    },
    skip: props.skip,
  });
  return (
    <>
      {props.children({
        isLoading: loading,
        error,
        project: data && data.project,
      })}
    </>
  );
};
FetchProject.displayName = 'FetchProject';
FetchProject.propTypes = {
  projectKey: PropTypes.string,
  skip: PropTypes.bool,
  children: PropTypes.func.isRequired,
};
FetchProject.defaultProps = {
  skip: false,
};

export default FetchProject;
