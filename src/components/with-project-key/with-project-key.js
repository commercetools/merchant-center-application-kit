import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';

export const WithProjectKeyFromCacheOrUser = props => {
  const cachedProjectKey = storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
  // At this point `projectKey` can still be `null`.
  // This happens e.g. when the user is not logged in, tries to
  // access a route under `/account` directly. After being logged
  // in again, there is no projectKey in localStorage. In this case we
  // attempt to get the first project key from the list of available
  // projects of the user. In case there are no available projects, we
  // do not render anything.
  const projectKey =
    !cachedProjectKey && props.user.availableProjects.length > 0
      ? props.user.availableProjects[0].key
      : cachedProjectKey;

  if (!projectKey) return null;
  // Render only if there is a project key
  return props.render({ projectKey });
};
WithProjectKeyFromCacheOrUser.displayName = 'WithProjectKeyFromCacheOrUser';
WithProjectKeyFromCacheOrUser.propTypes = {
  user: PropTypes.shape({
    availableProjects: PropTypes.array.isRequired,
  }),
  render: PropTypes.func.isRequired,
};

const WithProjectKey = props => {
  if (!props.user) return null;
  return (
    <Switch>
      {/**
       * For some components that require the projectKey param from the URL, we need
       * to be careful to differentiate between the actual projectKey or an internal
       * protected route.
       * For example: `/:projectKey` can match both `/my-project-key` and `/account/profile`
       * In this case `account` is not meant to be considered a project key,
       * therefore we select the project key from local storage.
       */}
      <Route
        exact={true}
        path="/"
        render={() => (
          <WithProjectKeyFromCacheOrUser
            user={props.user}
            render={props.render}
          />
        )}
      />
      <Route
        path="/account"
        render={() => (
          <WithProjectKeyFromCacheOrUser
            user={props.user}
            render={props.render}
          />
        )}
      />
      <Route
        path="/:projectKey"
        render={routerProps =>
          props.render({
            projectKey: routerProps.match.params.projectKey,
          })
        }
      />
    </Switch>
  );
};
WithProjectKey.displayName = 'WithProjectKey';
WithProjectKey.propTypes = {
  user: PropTypes.shape({
    availableProjects: PropTypes.array.isRequired,
  }),
  render: PropTypes.func.isRequired,
};

export default WithProjectKey;
