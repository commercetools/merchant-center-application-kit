import React from 'react';
import PropTypes from 'prop-types';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { Spacings, Text, LinkButton } from '@commercetools-frontend/ui-kit';

export const RedirectToProjectCreate = props => {
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
        Please go to the `application-accounts` while having it runnign to
        create a project first.
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
