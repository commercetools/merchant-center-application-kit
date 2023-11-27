import type { ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { designTokens as appKitDesignTokens } from '../../theming';
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

const CustomViewsSelectorWrapper = styled.div`
  margin-top: ${uiKitDesignTokens.spacing40};
`;

const PageHeader = (props: Props) => {
  return (
    <div
      css={css`
        margin: ${appKitDesignTokens.marginForModalPageHeader};
        padding: ${appKitDesignTokens.paddingForModalPageHeader};
        border-bottom: 1px solid
          ${appKitDesignTokens.borderColorForModalPageHeaderDivider};/
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
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
      {Boolean(props.customViewLocatorCode) && (
        <CustomViewsSelectorWrapper>
          <CustomViewsSelector
            customViewLocatorCode={props.customViewLocatorCode}
          />
        </CustomViewsSelectorWrapper>
      )}
    </div>
  );
};
PageHeader.displayName = 'PageHeader';

export default PageHeader;
