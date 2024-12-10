import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import CommercetoolsLogoSmallSvg from '@commercetools-frontend/assets/logos/commercetools_logo_small.svg';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import {
  Container,
  ContainerColumn,
  ContainerColumnWide,
} from './public-page-layout.styles';

const year = new Date().getUTCFullYear();

type TProps = {
  /**
   * The text to be displayed below the commercetools logo.
   */
  welcomeMessage?: string;
  /**
   * Renders a node below the content. This is usually the place for rendering
   * links to the privacy, terms, etc pages.
   */
  legalMessage?: ReactNode;
  /**
   * The `normal` scale uses an horizontal contraint size of `8` (384px).
   * The `wide` scale uses an horizontal contraint size of `15` (742px).
   * The `wide` scale can be used for rendering the content in 2 columns.
   */
  contentScale?: 'normal' | 'wide';
  /**
   * If `contentScale` is `normal`, the content is rendered in one column.
   * If `contentScale` is `wide`, you need to pass 2 children as they will be displayed
   * in two columns.
   */
  children: ReactNode;
};

const PublicPageLayoutContent: FC<TProps> = ({
  contentScale = 'normal',
  ...props
}) => {
  if (contentScale === 'wide') {
    return <ContainerColumnWide>{props.children}</ContainerColumnWide>;
  }
  return <ContainerColumn>{props.children}</ContainerColumn>;
};

const PublicPageLayout: FC<TProps> = ({
  contentScale = 'normal',
  ...props
}) => {
  return (
    <Container>
      <Spacings.Stack scale="xl" alignItems="center">
        <ContainerColumn>
          <Spacings.Inline justifyContent="center">
            <img src={CommercetoolsLogoSmallSvg} alt="commercetools logo" />
          </Spacings.Inline>
        </ContainerColumn>
        {props.welcomeMessage && (
          <ContainerColumn>
            <Text.Headline as="h2">
              <div
                css={css`
                  color: ${uiKitDesignTokens.colorSolid};
                  text-align: center;
                `}
              >
                {props.welcomeMessage}
              </div>
            </Text.Headline>
          </ContainerColumn>
        )}
        <Spacings.Stack scale="xl">
          <PublicPageLayoutContent {...props} />
          <PublicPageLayoutContent contentScale={contentScale}>
            <Spacings.Stack
              scale="xs"
              alignItems={contentScale === 'wide' ? 'center' : 'stretch'}
            >
              {props.legalMessage && (
                <Text.Detail tone="secondary">{props.legalMessage}</Text.Detail>
              )}
              {
                <Text.Detail tone="secondary">{`${year} © commercetools`}</Text.Detail>
              }
            </Spacings.Stack>
          </PublicPageLayoutContent>
        </Spacings.Stack>
      </Spacings.Stack>
    </Container>
  );
};
PublicPageLayout.displayName = 'PublicPageLayout';

export default PublicPageLayout;
