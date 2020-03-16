import React from 'react';
import { Link } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import FlatButton from '@commercetools-uikit/flat-button';
import Text from '@commercetools-uikit/text';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { location } from '../../utils/location';

export const RedirectToProjectCreate = () => {
  const servedByProxy = useApplicationContext(
    context => context.environment.servedByProxy
  );
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
  if (servedByProxy === true) {
    location.replace('/account/projects/new');

    return null;
  }

  return (
    <Spacings.Stack>
      <Text.Headline as="h3">Please create a project!</Text.Headline>
      <Text.Body>
        You are using the Merchant Center in development mode - it is not served
        by a proxy (`env.json`). Moreover, you do not have any projects yet. As
        a result we did not redirect you anywhere (e.g. another application).
      </Text.Body>
      <Text.Body>
        Please go to the `application-accounts` while having it running to
        create a project first. Note, that you can do the same on staging.
      </Text.Body>
      <FlatButton as={Link} to="account/projects/new" label="Create project" />
    </Spacings.Stack>
  );
};
RedirectToProjectCreate.displayName = 'RedirectToProjectCreate';

export default RedirectToProjectCreate;
