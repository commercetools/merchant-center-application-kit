import type { ReactElement, ReactNode } from 'react';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import PageHeaderTitle from './page-header-title';
import { designTokens as appKitDesignTokens } from '../../theming';

type Props = {
  title: string;
  subtitle?: string | ReactElement;
  children?: ReactNode;
};

const PageHeader = (props: Props) => (
  <div
    css={css`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin: ${appKitDesignTokens.marginForModalPageHeader};
      padding: ${uiKitDesignTokens.spacingM} 0;
      border-bottom: 1px solid
        ${appKitDesignTokens.borderColorForModalPageHeaderDivider};
      & > * + * {
        margin-left: ${uiKitDesignTokens.spacingM};
      }
    `}
  >
    <PageHeaderTitle title={props.title} subtitle={props.subtitle} truncate />
    {props.children}
  </div>
);
PageHeader.displayName = 'PageHeader';

export default PageHeader;
