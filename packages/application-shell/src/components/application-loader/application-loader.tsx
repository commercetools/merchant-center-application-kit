import { css } from '@emotion/react';
import CTLogoSVG from '@commercetools-frontend/assets/images/ct-logo.svg';
import { customProperties } from '@commercetools-uikit/design-system';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

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
      padding: ${customProperties.spacingL};

      > * + * {
        margin: ${customProperties.spacingL} 0 0;
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
