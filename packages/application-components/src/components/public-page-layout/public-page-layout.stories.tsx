import { css } from '@emotion/react';
import { VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import DoorsClosedSvg from '@commercetools-frontend/assets/images/doors-closed.svg';
import Card from '@commercetools-uikit/card';
import { customProperties } from '@commercetools-uikit/design-system';
import Link from '@commercetools-uikit/link';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import PublicPageLayout from './public-page-layout';

const LegalMessage = () => (
  <Text.Body tone="inverted">
    {'Read our '}
    <Link isExternal={true} to="https://commercetools.com/privacy#suppliers">
      {'Privacy Policy'}
    </Link>
    {' and '}
    <Link isExternal={true} to="https://commercetools.com/trial-agreement-eu">
      {'Terms of Service'}
    </Link>
    {'.'}
  </Text.Body>
);

const meta: Meta<typeof PublicPageLayout> = {
  title: 'Application Components/PublicPageLayout',
  component: PublicPageLayout,
};

export default meta;

type Story = StoryObj<typeof PublicPageLayout>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="PublicPageLayout">
        <PublicPageLayout>
          <Card>
            {
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.'
            }
          </Card>
        </PublicPageLayout>
      </VisualSpecGroup>
      <VisualSpecGroup label="PublicPageLayout with long legal message">
        <PublicPageLayout legalMessage="Lea nuestra Política de privacidad y nuestros Términos del servicio.">
          <Card>
            {
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.'
            }
          </Card>
        </PublicPageLayout>
      </VisualSpecGroup>
    </>
  ),
};

export const PublicPageForm: Story = {
  render: () => (
    <VisualSpecGroup label="PublicPageForm">
      <PublicPageLayout
        welcomeMessage="Welcome to the Merchant Center"
        legalMessage={<LegalMessage />}
      >
        <Card>
          <Spacings.Stack>
            <Text.Headline as="h2">{'Login'}</Text.Headline>
            <Text.Body>{'The login form'}</Text.Body>
          </Spacings.Stack>
        </Card>
      </PublicPageLayout>
    </VisualSpecGroup>
  ),
};

export const PublicPageFormWide: Story = {
  render: () => (
    <VisualSpecGroup label="PublicPageFormWide">
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
                    <img width="100%" src={DoorsClosedSvg} alt="" />
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
                <Text.Headline as="h2">{'Login'}</Text.Headline>
                <Text.Body>{'The login form'}</Text.Body>
              </Spacings.Stack>
            </div>
          </div>
        </Card>
      </PublicPageLayout>
    </VisualSpecGroup>
  ),
};
