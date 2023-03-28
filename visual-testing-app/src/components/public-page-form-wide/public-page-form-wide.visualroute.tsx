import { css } from '@emotion/react';
import { PublicPageLayout } from '@commercetools-frontend/application-components';
import DoorsClosedSvg from '@commercetools-frontend/assets/images/doors-closed.svg';
import Card from '@commercetools-uikit/card';
import { customProperties } from '@commercetools-uikit/design-system';
import Link from '@commercetools-uikit/link';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/public-page-form-wide';

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
    <Spec label="PublicPageFormWide">
      <PublicPageLayout
        welcomeMessage="Welcome to the Merchant Center"
        legalMessage={<LegalMessage />}
        contentScale="wide"
      >
        <Card insetScale="none">
          <div
            css={css`
              display: flex;
              > * + * {
                padding: ${customProperties.spacingM};
              }
            `}
          >
            <div
              css={css`
                width: calc(${customProperties.constraint15} / 2);
              `}
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
            </div>

            <div
              css={css`
                width: calc(${customProperties.constraint15} / 2);
              `}
            >
              <Spacings.Stack>
                <Text.Headline as="h2">Login</Text.Headline>
                <Text.Body>The login form</Text.Body>
              </Spacings.Stack>
            </div>
          </div>
        </Card>
      </PublicPageLayout>
    </Spec>
  </Suite>
);
