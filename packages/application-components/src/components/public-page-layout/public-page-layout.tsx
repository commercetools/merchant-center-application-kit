import React, { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import invariant from 'tiny-invariant';
import CommercetoolsLogoSvg from '@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_white-text_RGB.svg';
import { customProperties } from '@commercetools-uikit/design-system';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Card from '@commercetools-uikit/card';
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
   * The `wide` scale can be used for
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
  height: 100vh;
  display: flex;
  padding-top: ${customProperties.spacingXl};
  justify-content: center;
  background-size: cover;
  background-image: url(data:image/png;base64,${base64Background});
  background-position: center;
`;
const ContainerWideColumn = styled.div`
  width: calc(${customProperties.constraint15} / 2);
`;

const PublicPageLayoutContent: FC<TProps> = (props) => {
  if (props.contentScale === 'wide') {
    invariant(
      React.Children.count(props.children) === 2,
      `@commercetools-frontend/application-components/PublicPageLayout: using the "wide" size requires to pass 2 children.`
    );

    return (
      <Card
        css={css`
          display: flex;
          width: ${customProperties.constraint15};
          padding: 0;
        `}
      >
        {React.Children.map(props.children, (child, index) => (
          <ContainerWideColumn key={index}>{child}</ContainerWideColumn>
        ))}
      </Card>
    );
  }

  return <Card>{props.children}</Card>;
};

const PublicPageLayout: FC<TProps> = (props) => {
  return (
    <Container>
      <Spacings.Stack scale="xl" alignItems="center">
        <Constraints.Horizontal max={8}>
          <div>
            <img
              width="100%"
              src={CommercetoolsLogoSvg}
              alt="commercetools logo"
            />
          </div>
        </Constraints.Horizontal>
        {props.welcomeMessage && (
          <Constraints.Horizontal max={8}>
            <Text.Headline as="h2">
              <div
                css={css`
                  color: ${customProperties.colorSurface};
                `}
              >
                {props.welcomeMessage}
              </div>
            </Text.Headline>
          </Constraints.Horizontal>
        )}
        <Constraints.Horizontal max={props.contentScale === 'wide' ? 15 : 8}>
          <Spacings.Stack scale="s">
            <PublicPageLayoutContent {...props} />
            <Spacings.Stack
              scale="xs"
              alignItems={props.contentScale === 'wide' ? 'center' : 'stretch'}
            >
              {props.legalMessage && (
                <Text.Body tone="inverted">{props.legalMessage}</Text.Body>
              )}
              <Text.Body tone="inverted">{`${year} © commercetools`}</Text.Body>
            </Spacings.Stack>
          </Spacings.Stack>
        </Constraints.Horizontal>
      </Spacings.Stack>
    </Container>
  );
};
PublicPageLayout.displayName = 'PublicPageLayout';
PublicPageLayout.defaultProps = {
  contentScale: 'normal',
};

export default PublicPageLayout;
