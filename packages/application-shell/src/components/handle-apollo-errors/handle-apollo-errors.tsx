import type { QueryResult } from 'react-apollo';

import React from 'react';
import { useDispatch } from 'react-redux';
import { handleActionError } from '@commercetools-frontend/actions-global';
import getDisplayName from '../../utils/get-display-name';

type QueryResultNames = string[];
type Props = {
  [key: string]: QueryResult;
};

function handleApolloErrors(queryResultNames: QueryResultNames) {
  const dispatchedErrors = new Map();
  return (Component: React.ComponentType) => {
    const WrappedComponent = (props: Props) => {
      const dispatch = useDispatch();
      React.useEffect(() => {
        queryResultNames.forEach((name) => {
          // To avoid infinite loops (dispatch -> store updates -> connected renders -> didUpdate -> dispatch)
          // we keep track of the errors that have been dispatched.
          // If an error has been dispatched already, we don't do anything else.
          // If an error has been dispatched already but the query does not contain an error anymore,
          // we remove the entry from the dispatchedErrors map.
          // If an error has not been dispatched yet, we keep track of it and we dispatch it.
          const queryResult = props[name];
          if (queryResult) {
            const hasPreviouslyDispatchedError = Boolean(
              dispatchedErrors.get(name)
            );
            if (hasPreviouslyDispatchedError && !queryResult.error) {
              dispatchedErrors.delete(name);
            }
            if (!hasPreviouslyDispatchedError && queryResult.error) {
              dispatchedErrors.set(name, queryResult.error);
              dispatch(handleActionError(queryResult.error));
            }
          }
        });
      }, [dispatch, props]);
      return <Component {...props} />;
    };
    WrappedComponent.displayName = `handleApolloErrors(${getDisplayName(
      Component
    )})`;
    return WrappedComponent;
  };
}

export default handleApolloErrors;
