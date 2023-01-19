import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CommercetoolsLogoSvg from '@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_white-text_RGB.svg';
import { customProperties } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { designTokens as appKitDesingTokens } from '../../theming';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import base64Background from /* preval */ './public-background';

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

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  padding: ${customProperties.spacingXl} 0;
  justify-content: center;
  background-size: cover;
  background-image: url(data:image/png;base64,${base64Background});
  background-position: center;
`;
const ContainerColumn = styled.div`
  width: ${appKitDesingTokens.widthForPageLayoutContentColumn};
`;
const ContainerColumnWide = styled.div`
  width: ${customProperties.constraint15};
`;

const PublicPageLayoutContent: FC<TProps> = (props) => {
  if (props.contentScale === 'wide') {
    return <ContainerColumnWide>{props.children}</ContainerColumnWide>;
  }
  return <ContainerColumn>{props.children}</ContainerColumn>;
};

const PublicPageLayout: FC<TProps> = (props) => {
  return (
    <Container>
      <Spacings.Stack scale="xl" alignItems="center">
        <ContainerColumn>
          <div>
            <img
              width="100%"
              src={CommercetoolsLogoSvg}
              alt="commercetools logo"
            />
          </div>
        </ContainerColumn>
        {props.welcomeMessage && (
          <ContainerColumn>
            <Text.Headline as="h2">
              <div
                css={css`
                  color: ${customProperties.colorSurface};
                `}
              >
                {props.welcomeMessage}
              </div>
            </Text.Headline>
          </ContainerColumn>
        )}
        <Spacings.Stack scale="s">
          <PublicPageLayoutContent {...props} />

          <PublicPageLayoutContent contentScale={props.contentScale}>
            <Spacings.Stack
              scale="xs"
              alignItems={props.contentScale === 'wide' ? 'center' : 'stretch'}
            >
              {props.legalMessage && (
                <Text.Body tone="inverted">{props.legalMessage}</Text.Body>
              )}
              <Text.Body tone="inverted">{`${year} © commercetools`}</Text.Body>
            </Spacings.Stack>
          </PublicPageLayoutContent>
        </Spacings.Stack>
      </Spacings.Stack>
    </Container>
  );
};
PublicPageLayout.displayName = 'PublicPageLayout';
PublicPageLayout.defaultProps = {
  contentScale: 'normal',
};

export default PublicPageLayout;
