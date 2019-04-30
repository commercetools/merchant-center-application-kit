import React from 'react';
import PropTypes from 'prop-types';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { Spacings, Text, LinkButton } from '@commercetools-frontend/ui-kit';

export const RedirectToProjectCreate = props => {
  /**
   * NOTE:
   *   This looks a bit unusual: redirecting in render.
   *   However, when doing it in `cDM` we loose time
   *   we we actually do never want to render anything or
   *   interact with anything rendered. Instead we should should
   *   redirect away. Using a constructor would result in the same.
   *   In turn this intends wo make explicit that we never want to
   *   render and instead just navigate away.
   */
  if (props.servedByProxy === true)
    window.location.replace('/account/projects/new');

  return (
    <Spacings.Stack>
      <Text.Headline elementType="h3">Please create a project!</Text.Headline>
      <Text.Body>
        You are using the Merchant Center in development mode - it is not served
        by a proxy (`env.json`). Moreover, you do not have any projects yet. As
        a result we did not redirect you anywhere (e.g. another application).
      </Text.Body>
      <Text.Body>
        Please go to the `application-accounts` while having it running to
        create a project first. Note, that you can do the same on staging.
      </Text.Body>
      <LinkButton to={`account/projects/new`} label="Create project" />
    </Spacings.Stack>
  );
};
RedirectToProjectCreate.displayName = 'RedirectToProjectCreate';
RedirectToProjectCreate.propTypes = {
  servedByProxy: PropTypes.bool.isRequired,
};

export default withApplicationContext(applicationContext => ({
  servedByProxy: applicationContext.environment.servedByProxy,
}))(RedirectToProjectCreate);
