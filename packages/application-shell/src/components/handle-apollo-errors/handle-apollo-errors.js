import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';
import { handleActionError } from '@commercetools-frontend/actions-global';
import getDisplayName from '../../utils/get-display-name';

function handleApolloErrors(queryResultNames) {
  return Component => {
    class WrappedComponent extends React.Component {
      static displayName = `handleApolloErrors(${getDisplayName(Component)})`;
      static propTypes = {
        ...queryResultNames.reduce(
          (names, name) => ({
            [name]: PropTypes.shape({ error: PropTypes.object }),
          }),
          {}
        ),
      };
      static contextType = ReactReduxContext;
      dispatchedErrors = new Map();
      componentDidUpdate() {
        queryResultNames.forEach(name => {
          // To avoid infinite loops (dispatch -> store updates -> connected renders -> didUpdate -> dispatch)
          // we keep track of the errors that have been dispatched.
          // If an error has been dispatched already, we don't do anything else.
          // If an error has been dispatched already but the query does not contain an error anymore,
          // we remove the entry from the dispatchedErrors map.
          // If an error has not been dispatched yet, we keep track of it and we dispatch it.
          const queryResult = this.props[name];
          if (queryResult) {
            const hasPreviouslyDispatchedError = Boolean(
              this.dispatchedErrors.get(name)
            );
            const hasQueryErrored = Boolean(queryResult.error);
            if (hasPreviouslyDispatchedError && !hasQueryErrored) {
              this.dispatchedErrors.delete(name);
            }
            if (!hasPreviouslyDispatchedError && hasQueryErrored) {
              this.dispatchedErrors.set(name, queryResult.error);
              this.context.store.dispatch(handleActionError(queryResult.error));
            }
          }
        });
      }
      render() {
        return <Component {...this.props} />;
      }
    }
    return WrappedComponent;
  };
}

export default handleApolloErrors;
