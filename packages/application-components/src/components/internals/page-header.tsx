import type { ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens as appKitDesignTokens } from '../../theming';
import PageHeaderTitle from './page-header-title';

type Props = {
  title: string;
  subtitle?: string | ReactElement;
  children?: ReactNode;
};

const PageHeader = (props: Props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin: ${appKitDesignTokens.marginForModalPageHeader};
        padding: ${appKitDesignTokens.paddingForModalPageHeader};
        border-bottom: 1px solid
          ${appKitDesignTokens.borderColorForModalPageHeaderDivider};
        & > * + * {
          margin-left: ${appKitDesignTokens.marginLeftForModalPageHeaderControls};
        }
      `}
    >
      <PageHeaderTitle
        title={props.title}
        titleSize="big"
        subtitle={props.subtitle}
        truncate
      />
      {props.children}
    </div>
  );
};
PageHeader.displayName = 'PageHeader';

export default PageHeader;
