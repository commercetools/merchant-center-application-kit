import React from 'react';
import PropTypes from 'prop-types';
import { deepEqual } from 'fast-equals';
import { Query } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import LoggedInUserQuery from './fetch-user.graphql';

class FetchUser extends React.Component {
  static displayName = 'FetchUser';
  static propTypes = {
    children: PropTypes.func.isRequired,
  };
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }
  render() {
    return (
      <Query
        query={LoggedInUserQuery}
        variables={{ target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND }}
      >
        {({ data, loading, error }) =>
          this.props.children({
            isLoading: loading,
            user: data && data.user,
            error,
          })
        }
      </Query>
    );
  }
}

export default FetchUser;
