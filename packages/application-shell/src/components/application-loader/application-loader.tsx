import { css } from '@emotion/react';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { designTokens } from '@commercetools-uikit/design-system';
import CTLogoSVG from '@commercetools-frontend/assets/images/ct-logo.svg';

type Props = {
  showLogo?: boolean;
};

const ApplicationLoader = (props: Props) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      flex-direction: column;
      height: 100vh;
      padding: ${designTokens.spacingL};

      > * + * {
        margin: ${designTokens.spacingL} 0 0;
      }
    `}
    data-testid="application-loader"
  >
    <LoadingSpinner />
    {props.showLogo === true ? (
      <img alt="commercetools logo" src={CTLogoSVG} />
    ) : null}
  </div>
);
ApplicationLoader.displayName = 'ApplicationLoader';

export default ApplicationLoader;
