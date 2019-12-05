import React from 'react';
import { customProperties } from '@commercetools-uikit/design-system';
import { css } from '@emotion/core';
import ModalPageHeaderTitle from './modal-page-header-title';

type Props = {
  title: string;
  subtitle?: string | React.ReactElement;
  children?: React.ReactNode;
};

const ModalPageHeader = (props: Props) => (
  <div
    css={css`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin: 0 ${customProperties.spacingM};
      padding: ${customProperties.spacingM} 0;
      border-bottom: 1px solid ${customProperties.colorNeutral60};
      & > * + * {
        margin-left: ${customProperties.spacingM};
      }
    `}
  >
    <ModalPageHeaderTitle title={props.title} subtitle={props.subtitle} />
    {props.children}
  </div>
);
ModalPageHeader.displayName = 'ModalPageHeader';

export default ModalPageHeader;
