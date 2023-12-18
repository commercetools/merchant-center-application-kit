import styled from '@emotion/styled';
import { CUSTOM_EXTENSION_TYPES } from '@commercetools-frontend/constants';
import { designTokens as appKitDesignTokens } from '../../../theming';

export const MainPageContainer = styled.div`
  padding: ${appKitDesignTokens.paddingForMainPageHeader};
  body[data-extension-type='${CUSTOM_EXTENSION_TYPES.CUSTOM_VIEW}'] & {
    padding: ${appKitDesignTokens.paddingForMainPageHeaderInCustomView};
  }
`;

export const Divider = styled.hr`
  background-color: ${appKitDesignTokens.backgroundColorForMainPageDivider};
  height: 1px;
  border: 0;
`;

export const MainPageContent = styled.div`
  flex: 1;
  flex-basis: 0;
  overflow: auto;
  // NOTE: do not change to "padding" as this breaks sticky DataTable styles
  margin: ${appKitDesignTokens.marginForPageContent};
  body[data-extension-type='${CUSTOM_EXTENSION_TYPES.CUSTOM_VIEW}'] & {
    margin: ${appKitDesignTokens.marginForPageContentInCustomView};
  }
`;
