import type { ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import CustomViewsSelector from '../custom-views/custom-views-selector';
import PageHeaderTitle from './page-header-title';

type Props = {
  title: string;
  subtitle?: string | ReactElement;
  /**
   * This code is used to configure which Custom Views are available for this page.
   */
  customViewLocatorCode?: string;
  children?: ReactNode;
};

const PageHeader = (props: Props) => {
  return (
    <div
      css={css`
        margin: 0 ${uiKitDesignTokens.spacing55};
        padding: ${uiKitDesignTokens.spacing40} 0 ${uiKitDesignTokens.spacing40};
        border-bottom: 1px solid ${uiKitDesignTokens.colorNeutral90};
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          & > * + * {
            margin-left: ${uiKitDesignTokens.spacing50};
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
      <CustomViewsSelector
        margin={`${uiKitDesignTokens.spacing40} 0 0 0`}
        customViewLocatorCode={props.customViewLocatorCode}
      />
    </div>
  );
};
PageHeader.displayName = 'PageHeader';

export default PageHeader;
