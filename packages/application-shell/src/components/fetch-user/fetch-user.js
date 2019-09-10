import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import LoggedInUserQuery from './fetch-user.users.graphql';

const FetchUser = props => {
  const { loading, data, error } = useQuery(LoggedInUserQuery, {
    onError: reportErrorToSentry,
    variables: { target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND },
  });
  return (
    <>
      {props.children({ isLoading: loading, user: data && data.user, error })}
    </>
  );
};
FetchUser.displayName = 'FetchUser';
FetchUser.propTypes = {
  children: PropTypes.func.isRequired,
};

export default FetchUser;
