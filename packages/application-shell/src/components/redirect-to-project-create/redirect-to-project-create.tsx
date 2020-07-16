import React from 'react';
import { css } from '@emotion/core';
import Spacings from '@commercetools-uikit/spacings';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import Card from '@commercetools-uikit/card';
import { customProperties } from '@commercetools-uikit/design-system';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { location } from '../../utils/location';

export const RedirectToProjectCreate = () => {
  const servedByProxy = useApplicationContext(
    (context) => context.environment.servedByProxy
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
    <div
      css={css`
        align-self: center;
        margin-top: ${customProperties.spacingXl};
        max-width: ${customProperties.constraintL};
      `}
    >
      <Card type="flat" theme="dark">
        <Spacings.Stack>
          <Text.Headline as="h1">Please create a project!</Text.Headline>
          <ContentNotification type="info">
            You are running in development mode
          </ContentNotification>
          <Text.Body>
            The Custom Application is not running behind the Merchant Center
            Proxy. Therefore, you are not being redirected to the account
            section to create a new project.
          </Text.Body>
          <Text.Body>
            If you do need to create a project, we recommend to go to the
            Merchant Center production URL and create a project there. After
            that, you can access your new project from your local environment.
          </Text.Body>
        </Spacings.Stack>
      </Card>
    </div>
  );
};
RedirectToProjectCreate.displayName = 'RedirectToProjectCreate';

export default RedirectToProjectCreate;
