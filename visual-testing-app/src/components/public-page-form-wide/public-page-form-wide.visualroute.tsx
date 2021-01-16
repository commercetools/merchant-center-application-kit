import React from 'react';
import { PublicPageLayout } from '@commercetools-frontend/application-components';
import DoorsClosedSvg from '@commercetools-frontend/assets/images/project-not-initialized.svg';
// @ts-ignore
import Link from '@commercetools-uikit/link';
import Spacings from '@commercetools-uikit/spacings';
import { customProperties } from '@commercetools-uikit/design-system';
import Text from '@commercetools-uikit/text';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/public-page-form-wide';

const LegalMessage = () => (
  <p>
    Read our{' '}
    <Link isExternal={true} to="https://commercetools.com/privacy#suppliers">
      Privacy Policy
    </Link>{' '}
    and{' '}
    <Link isExternal={true} to="https://commercetools.com/trial-agreement-eu">
      Terms of Service
    </Link>
    .
  </p>
);

export const Component = () => (
  <Suite>
    <Spec label="PublicPageFormWide">
      <PublicPageLayout
        welcomeMessage="Welcome to the Merchant Center"
        legalMessage={<LegalMessage />}
        contentScale="wide"
      >
        <div
          style={{
            backgroundColor: customProperties.colorNeutral95,
            borderTopLeftRadius: customProperties.borderRadius6,
            borderBottomLeftRadius: customProperties.borderRadius6,
          }}
        >
          <Spacings.Inset>
            <Spacings.Inline alignItems="center" justifyContent="center">
              <img src={DoorsClosedSvg} />
            </Spacings.Inline>
          </Spacings.Inset>
        </div>

        <Spacings.Inset>
          <Spacings.Stack>
            <Text.Headline as="h2">Login</Text.Headline>
            <Text.Body>The login form</Text.Body>
          </Spacings.Stack>
        </Spacings.Inset>
      </PublicPageLayout>
    </Spec>
  </Suite>
);
