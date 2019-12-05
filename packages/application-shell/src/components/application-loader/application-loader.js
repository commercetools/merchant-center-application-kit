import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { customProperties } from '@commercetools-uikit/design-system';
import CTLogoSVG from '@commercetools-frontend/assets/images/ct-logo.svg';

const ApplicationLoader = props => (
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
  >
    <LoadingSpinner />
    {props.showLogo && <img alt="commercetools logo" src={CTLogoSVG} />}
  </div>
);
ApplicationLoader.displayName = 'ApplicationLoader';
ApplicationLoader.propTypes = {
  showLogo: PropTypes.bool,
};
ApplicationLoader.defaultProps = {
  showLogo: false,
};

export default ApplicationLoader;
