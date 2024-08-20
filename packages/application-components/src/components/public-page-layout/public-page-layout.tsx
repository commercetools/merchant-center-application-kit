import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useFlagVariation } from '@flopflip/react-broadcast';
import CommercetoolsLogoOnWhiteSvg from '@commercetools-frontend/assets/logos/commercetools_logo_small.svg';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import {
  ENABLE_SIGN_UP,
  ENABLE_WORKSPACES_UI,
} from '../../constants/feature-toggles';
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
  padding: ${uiKitDesignTokens.spacingXl} 0;
  justify-content: center;
  background-size: cover;
  background-position: center;
`;
const NewContainer = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  --1x: 25%;
  --1y: 25%;
  --2x: 75%;
  --2y: 25%;
  --3x: 25%;
  --3y: 75%;
  --4x: 75%;
  --4y: 75%;
  background: radial-gradient(
      70% 70% at var(--3x) var(--3y),
      var(--color-primary-90) 1%,
      transparent 65%
    ),
    radial-gradient(
      70% 70% at var(--2x) var(--2y),
      var(--color-primary-90) 1%,
      transparent 75%
    ),
    radial-gradient(
      30% 90% at var(--4x) var(--4y),
      var(--color-turquoise-90) 0% 5%,
      transparent 80%
    ),
    radial-gradient(
      30% 90% at var(--1x) var(--1y),
      var(--color-turquoise-90) 0% 5%,
      transparent 80%
    );
  background-blend-mode: color;
  animation: gradients 10s ease both infinite;
}

@keyframes gradients {
  0% {
    --1x: 25%;
    --1y: 25%;
    --2x: 75%;
    --2y: 25%;
    --3x: 25%;
    --3y: 75%;
    --4x: 75%;
    --4y: 75%;
  }
  1% {
    --1y: 26%;
    --2y: 26%;
    --3y: 74%;
    --4y: 74%;
  }
  2% {
    --1y: 27%;
    --2y: 27%;
    --3y: 73%;
    --4y: 73%;
  }
  3% {
    --1y: 28%;
    --2y: 28%;
    --3y: 72%;
    --4y: 72%;
  }
  4% {
    --1y: 29%;
    --2y: 29%;
    --3y: 71%;
    --4y: 71%;
  }
  5% {
    --1y: 30%;
    --2y: 30%;
    --3y: 70%;
    --4y: 70%;
  }
  6% {
    --1y: 31%;
    --2y: 31%;
    --3y: 69%;
    --4y: 69%;
  }
  7% {
    --1y: 32%;
    --2y: 32%;
    --3y: 68%;
    --4y: 68%;
  }
  8% {
    --1y: 33%;
    --2y: 33%;
    --3y: 67%;
    --4y: 67%;
  }
  9% {
    --1y: 34%;
    --2y: 34%;
    --3y: 66%;
    --4y: 66%;
  }
  10% {
    --1y: 35%;
    --2y: 35%;
    --3y: 65%;
    --4y: 65%;
  }
  11% {
    --1y: 36%;
    --2y: 36%;
    --3y: 64%;
    --4y: 64%;
  }
  12% {
    --1y: 37%;
    --2y: 37%;
    --3y: 63%;
    --4y: 63%;
  }
  13% {
    --1y: 38%;
    --2y: 38%;
    --3y: 62%;
    --4y: 62%;
  }
  14% {
    --1y: 39%;
    --2y: 39%;
    --3y: 61%;
    --4y: 61%;
  }
  15% {
    --1y: 40%;
    --2y: 40%;
    --3y: 60%;
    --4y: 60%;
  }
  16% {
    --1y: 41%;
    --2y: 41%;
    --3y: 59%;
    --4y: 59%;
  }
  17% {
    --1y: 42%;
    --2y: 42%;
    --3y: 58%;
    --4y: 58%;
  }
  18% {
    --1y: 43%;
    --2y: 43%;
    --3y: 57%;
    --4y: 57%;
  }
  19% {
    --1y: 44%;
    --2y: 44%;
    --3y: 56%;
    --4y: 56%;
  }
  20% {
    --1y: 45%;
    --2y: 45%;
    --3y: 55%;
    --4y: 55%;
  }
  21% {
    --1y: 46%;
    --2y: 46%;
    --3y: 54%;
    --4y: 54%;
  }
  22% {
    --1y: 47%;
    --2y: 47%;
    --3y: 53%;
    --4y: 53%;
  }
  23% {
    --1y: 48%;
    --2y: 48%;
    --3y: 52%;
    --4y: 52%;
  }
  24% {
    --1y: 49%;
    --2y: 49%;
    --3y: 51%;
    --4y: 51%;
  }
  25% {
    --1y: 50%;
    --2y: 50%;
    --3y: 50%;
    --4y: 50%;
  }
  26% {
    --1y: 51%;
    --2y: 51%;
    --3y: 49%;
    --4y: 49%;
  }
  27% {
    --1y: 52%;
    --2y: 52%;
    --3y: 48%;
    --4y: 48%;
  }
  28% {
    --1y: 53%;
    --2y: 53%;
    --3y: 47%;
    --4y: 47%;
  }
  29% {
    --1y: 54%;
    --2y: 54%;
    --3y: 46%;
    --4y: 46%;
  }
  30% {
    --1y: 55%;
    --2y: 55%;
    --3y: 45%;
    --4y: 45%;
  }
  31% {
    --1y: 56%;
    --2y: 56%;
    --3y: 44%;
    --4y: 44%;
  }
  32% {
    --1y: 57%;
    --2y: 57%;
    --3y: 43%;
    --4y: 43%;
  }
  33% {
    --1y: 58%;
    --2y: 58%;
    --3y: 42%;
    --4y: 42%;
  }
  34% {
    --1y: 59%;
    --2y: 59%;
    --3y: 41%;
    --4y: 41%;
  }
  35% {
    --1y: 60%;
    --2y: 60%;
    --3y: 40%;
    --4y: 40%;
  }
  36% {
    --1y: 61%;
    --2y: 61%;
    --3y: 39%;
    --4y: 39%;
  }
  37% {
    --1y: 62%;
    --2y: 62%;
    --3y: 38%;
    --4y: 38%;
  }
  38% {
    --1y: 63%;
    --2y: 63%;
    --3y: 37%;
    --4y: 37%;
  }
  39% {
    --1y: 64%;
    --2y: 64%;
    --3y: 36%;
    --4y: 36%;
  }
  40% {
    --1y: 65%;
    --2y: 65%;
    --3y: 35%;
    --4y: 35%;
  }
  41% {
    --1y: 66%;
    --2y: 66%;
    --3y: 34%;
    --4y: 34%;
  }
  42% {
    --1y: 67%;
    --2y: 67%;
    --3y: 33%;
    --4y: 33%;
  }
  43% {
    --1y: 68%;
    --2y: 68%;
    --3y: 32%;
    --4y: 32%;
  }
  44% {
    --1y: 69%;
    --2y: 69%;
    --3y: 31%;
    --4y: 31%;
  }
  45% {
    --1y: 70%;
    --2y: 70%;
    --3y: 30%;
    --4y: 30%;
  }
  46% {
    --1y: 71%;
    --2y: 71%;
    --3y: 29%;
    --4y: 29%;
  }
  47% {
    --1y: 72%;
    --2y: 72%;
    --3y: 28%;
    --4y: 28%;
  }
  48% {
    --1y: 73%;
    --2y: 73%;
    --3y: 27%;
    --4y: 27%;
  }
  49% {
    --1y: 74%;
    --2y: 74%;
    --3y: 26%;
    --4y: 26%;
  }
  50% {
    --1x: 25%;
    --1y: 75%;
    --2x: 75%;
    --2y: 75%;
    --3x: 25%;
    --3y: 25%;
    --4x: 75%;
    --4y: 25%;
  }
  51% {
    --1y: 74%;
    --2y: 74%;
    --3y: 26%;
    --4y: 26%;
  }
  52% {
    --1y: 73%;
    --2y: 73%;
    --3y: 27%;
    --4y: 27%;
  }
  53% {
    --1y: 72%;
    --2y: 72%;
    --3y: 28%;
    --4y: 28%;
  }
  54% {
    --1y: 71%;
    --2y: 71%;
    --3y: 29%;
    --4y: 29%;
  }
  55% {
    --1y: 70%;
    --2y: 70%;
    --3y: 30%;
    --4y: 30%;
  }
  56% {
    --1y: 69%;
    --2y: 69%;
    --3y: 31%;
    --4y: 31%;
  }
  57% {
    --1y: 68%;
    --2y: 68%;
    --3y: 32%;
    --4y: 32%;
  }
  58% {
    --1y: 67%;
    --2y: 67%;
    --3y: 33%;
    --4y: 33%;
  }
  59% {
    --1y: 66%;
    --2y: 66%;
    --3y: 34%;
    --4y: 34%;
  }
  60% {
    --1y: 65%;
    --2y: 65%;
    --3y: 35%;
    --4y: 35%;
  }
  61% {
    --1y: 64%;
    --2y: 64%;
    --3y: 36%;
    --4y: 36%;
  }
  62% {
    --1y: 63%;
    --2y: 63%;
    --3y: 37%;
    --4y: 37%;
  }
  63% {
    --1y: 62%;
    --2y: 62%;
    --3y: 38%;
    --4y: 38%;
  }
  64% {
    --1y: 61%;
    --2y: 61%;
    --3y: 39%;
    --4y: 39%;
  }
  65% {
    --1y: 60%;
    --2y: 60%;
    --3y: 40%;
    --4y: 40%;
  }
  66% {
    --1y: 59%;
    --2y: 59%;
    --3y: 41%;
    --4y: 41%;
  }
  67% {
    --1y: 58%;
    --2y: 58%;
    --3y: 42%;
    --4y: 42%;
  }
  68% {
    --1y: 57%;
    --2y: 57%;
    --3y: 43%;
    --4y: 43%;
  }
  69% {
    --1y: 56%;
    --2y: 56%;
    --3y: 44%;
    --4y: 44%;
  }
  70% {
    --1y: 55%;
    --2y: 55%;
    --3y: 45%;
    --4y: 45%;
  }
  71% {
    --1y: 54%;
    --2y: 54%;
    --3y: 46%;
    --4y: 46%;
  }
  72% {
    --1y: 53%;
    --2y: 53%;
    --3y: 47%;
    --4y: 47%;
  }
  73% {
    --1y: 52%;
    --2y: 52%;
    --3y: 48%;
    --4y: 48%;
  }
  74% {
    --1y: 51%;
    --2y: 51%;
    --3y: 49%;
    --4y: 49%;
  }
  75% {
    --1y: 50%;
    --2y: 50%;
    --3y: 50%;
    --4y: 50%;
  }
  76% {
    --1y: 49%;
    --2y: 49%;
    --3y: 51%;
    --4y: 51%;
  }
  77% {
    --1y: 48%;
    --2y: 48%;
    --3y: 52%;
    --4y: 52%;
  }
  78% {
    --1y: 47%;
    --2y: 47%;
    --3y: 53%;
    --4y: 53%;
  }
  79% {
    --1y: 46%;
    --2y: 46%;
    --3y: 54%;
    --4y: 54%;
  }
  80% {
    --1y: 45%;
    --2y: 45%;
    --3y: 55%;
    --4y: 55%;
  }
  81% {
    --1y: 44%;
    --2y: 44%;
    --3y: 56%;
    --4y: 56%;
  }
  82% {
    --1y: 43%;
    --2y: 43%;
    --3y: 57%;
    --4y: 57%;
  }
  83% {
    --1y: 42%;
    --2y: 42%;
    --3y: 58%;
    --4y: 58%;
  }
  84% {
    --1y: 41%;
    --2y: 41%;
    --3y: 59%;
    --4y: 59%;
  }
  85% {
    --1y: 40%;
    --2y: 40%;
    --3y: 60%;
    --4y: 60%;
  }
  86% {
    --1y: 39%;
    --2y: 39%;
    --3y: 61%;
    --4y: 61%;
  }
  87% {
    --1y: 38%;
    --2y: 38%;
    --3y: 62%;
    --4y: 62%;
  }
  88% {
    --1y: 37%;
    --2y: 37%;
    --3y: 63%;
    --4y: 63%;
  }
  89% {
    --1y: 36%;
    --2y: 36%;
    --3y: 64%;
    --4y: 64%;
  }
  90% {
    --1y: 35%;
    --2y: 35%;
    --3y: 65%;
    --4y: 65%;
  }
  91% {
    --1y: 34%;
    --2y: 34%;
    --3y: 66%;
    --4y: 66%;
  }
  92% {
    --1y: 33%;
    --2y: 33%;
    --3y: 67%;
    --4y: 67%;
  }
  93% {
    --1y: 32%;
    --2y: 32%;
    --3y: 68%;
    --4y: 68%;
  }
  94% {
    --1y: 31%;
    --2y: 31%;
    --3y: 69%;
    --4y: 69%;
  }
  95% {
    --1y: 30%;
    --2y: 30%;
    --3y: 70%;
    --4y: 70%;
  }
  96% {
    --1y: 29%;
    --2y: 29%;
    --3y: 71%;
    --4y: 71%;
  }
  97% {
    --1y: 28%;
    --2y: 28%;
    --3y: 72%;
    --4y: 72%;
  }
  98% {
    --1y: 27%;
    --2y: 27%;
    --3y: 73%;
    --4y: 73%;
  }
  99% {
    --1y: 26%;
    --2y: 26%;
    --3y: 74%;
    --4y: 74%;
  }
  100% {
    --1x: 25%;
    --1y: 25%;
    --2x: 75%;
    --2y: 25%;
    --3x: 25%;
    --3y: 75%;
    --4x: 75%;
    --4y: 75%;
  }
}
`;
const ContainerColumn = styled.div`
  width: calc(${uiKitDesignTokens.constraint16} / 2);
`;
const ContainerColumnWide = styled.div`
  width: ${uiKitDesignTokens.constraint15};
`;

const PublicPageLayoutContent: FC<TProps> = (props) => {
  if (props.contentScale === 'wide') {
    return <ContainerColumnWide>{props.children}</ContainerColumnWide>;
  }
  return <ContainerColumn>{props.children}</ContainerColumn>;
};

const PublicPageLayout: FC<TProps> = (props) => {
  const enableWorkspacesUi = useFlagVariation('enableWorkspacesUi');
  const isWorkspacesUiEnabled =
    // @ts-ignore In case it's coming from the MC API, it's an object { value: boolean }.
    enableWorkspacesUi?.value ?? enableWorkspacesUi;
  console.log('isWorkspacesUiEnabled: ', enableWorkspacesUi);
  const ContainerToShow = isWorkspacesUiEnabled ? NewContainer : Container;
  return (
    <ContainerToShow>
      <Spacings.Stack scale="xl" alignItems="center">
        <ContainerColumn>
          <div>
            <img src={CommercetoolsLogoOnWhiteSvg} alt="commercetools logo" />
          </div>
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
          <PublicPageLayoutContent contentScale={props.contentScale}>
            <Spacings.Stack
              scale="xs"
              alignItems={props.contentScale === 'wide' ? 'center' : 'stretch'}
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
    </ContainerToShow>
  );
};
PublicPageLayout.displayName = 'PublicPageLayout';
PublicPageLayout.defaultProps = {
  contentScale: 'normal',
};

export default PublicPageLayout;
