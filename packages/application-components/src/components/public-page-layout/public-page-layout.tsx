import React, { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CommercetoolsLogoSvg from '@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_white-text_RGB.svg';
import { customProperties } from '@commercetools-uikit/design-system';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import base64Background from /* preval */ './public-background';

const year = new Date().getUTCFullYear();

type TProps = {
  welcomeMessage?: string;
  legalMessage?: string;
  horizontalConstraint?: 7 | 14;
  children: ReactNode;
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  padding-top: ${customProperties.spacingXl};
  justify-content: center;
  background-size: cover;
  background-image: url(data:image/png;base64,${base64Background});
  background-position: center;
`;

const PublicPageLayout: FC<TProps> = (props) => {
  return (
    <Container>
      <Spacings.Stack scale="xl">
        <Constraints.Horizontal max={7}>
          <div>
            <img src={CommercetoolsLogoSvg} alt="commercetools logo" />
          </div>
        </Constraints.Horizontal>
        {props.welcomeMessage && (
          <Text.Headline as="h2">
            <div
              css={css`
                color: ${customProperties.colorSurface};
              `}
            >
              {props.welcomeMessage}
            </div>
          </Text.Headline>
        )}
        <Constraints.Horizontal max={props.horizontalConstraint}>
          <Spacings.Stack scale="s">
            {props.children}
            <Spacings.Stack
              scale="xs"
              alignItems={
                props.horizontalConstraint === 7 ? 'stretch' : 'center'
              }
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
  horizontalConstraint: 7,
};

export default PublicPageLayout;
