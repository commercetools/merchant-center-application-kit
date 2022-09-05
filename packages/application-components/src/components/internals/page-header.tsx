import type { ReactElement, ReactNode } from 'react';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import PageHeaderTitle from './page-header-title';

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
      margin: 0 ${designTokens.spacingM};
      padding: ${designTokens.spacingM} 0;
      border-bottom: 1px solid ${designTokens.colorNeutral60};
      & > * + * {
        margin-left: ${designTokens.spacingM};
      }
    `}
  >
    <PageHeaderTitle title={props.title} subtitle={props.subtitle} truncate />
    {props.children}
  </div>
);
PageHeader.displayName = 'PageHeader';

export default PageHeader;
