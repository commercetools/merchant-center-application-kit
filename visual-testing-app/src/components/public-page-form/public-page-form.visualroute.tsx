import { PublicPageLayout } from '@commercetools-frontend/application-components';
import Card from '@commercetools-uikit/card';
import Link from '@commercetools-uikit/link';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/public-page-form';

const LegalMessage = () => (
  <Text.Body tone="inverted">
    Read our{' '}
    <Link isExternal={true} to="https://commercetools.com/privacy#suppliers">
      Privacy Policy
    </Link>{' '}
    and{' '}
    <Link isExternal={true} to="https://commercetools.com/trial-agreement-eu">
      Terms of Service
    </Link>
    .
  </Text.Body>
);

export const Component = () => (
  <Suite>
    <Spec label="PublicPageForm">
      <PublicPageLayout
        welcomeMessage="Welcome to the Merchant Center"
        legalMessage={<LegalMessage />}
      >
        <Card>
          <Spacings.Stack>
            <Text.Headline as="h2">Login</Text.Headline>
            <Text.Body>The login form</Text.Body>
          </Spacings.Stack>
        </Card>
      </PublicPageLayout>
    </Spec>
  </Suite>
);
