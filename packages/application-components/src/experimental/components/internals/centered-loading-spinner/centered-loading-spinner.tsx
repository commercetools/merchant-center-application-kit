import React from 'react';
import { css } from '@emotion/react';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const CenteredLoadingSpinner = (): JSX.Element => (
  <div
    data-testid="picker-centered-loading-spinner"
    css={css`
      height: 100%;
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
    `}
  >
    <LoadingSpinner />
  </div>
);
CenteredLoadingSpinner.displayName = 'CenteredLoadingSpinner';

export default CenteredLoadingSpinner;
