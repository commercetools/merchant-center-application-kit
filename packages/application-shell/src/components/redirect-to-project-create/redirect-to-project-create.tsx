import { useEffect } from 'react';
import { PageContentNarrow } from '@commercetools-frontend/application-components';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import useIsServedByProxy from '../../hooks/use-is-served-by-proxy';
import getMcOrigin from '../../utils/get-mc-origin';
import { location } from '../../utils/location';

declare let window: ApplicationWindow;

export const RedirectToProjectCreate = () => {
  const servedByProxy = useIsServedByProxy();

  useEffect(() => {
    if (servedByProxy === true) {
      location.replace('/account/projects/new');
      return;
    }
  }, [servedByProxy]);

  if (servedByProxy) {
    return null;
  }

  const mcUrl = getMcOrigin(window.app.mcApiUrl);
  return (
    <div>
      <Spacings.Inset scale="xl">
        <PageContentNarrow>
          <Spacings.Stack>
            <Text.Headline as="h1">Please create a project!</Text.Headline>
            <ContentNotification type="warning">
              You are running in development mode
            </ContentNotification>
            <Text.Body>
              The application is not running behind the{' '}
              <a
                href="https://docs.commercetools.com/custom-applications/concepts/merchant-center-proxy-router"
                target="_blank"
                rel="noopener noreferrer"
              >
                Merchant Center Proxy
              </a>{' '}
              in production and thus cannot be redirected to the account section
              to create a new project.
            </Text.Body>
            <Text.Body>
              Instead, we recommend to go to the{' '}
              <a href={mcUrl} target="_blank" rel="noopener noreferrer">
                Merchant Center production URL
              </a>{' '}
              and create a project there. After that, you can access your new
              project from your local environment.
            </Text.Body>
          </Spacings.Stack>
        </PageContentNarrow>
      </Spacings.Inset>
    </div>
  );
};
RedirectToProjectCreate.displayName = 'RedirectToProjectCreate';

export default RedirectToProjectCreate;
