import styled from '@emotion/styled';
import { designTokens as appKitDesignTokens } from '../../../theming';

export const MainPageContainer = styled.div`
  padding: ${appKitDesignTokens.paddingForMainPageHeader};
`;

export const Divider = styled.hr`
  background-color: ${appKitDesignTokens.backgroundColorForMainPageDivider};
  height: 1px;
  border: 0;
`;

// NOTE: do not change "margin" to "padding" as this breaks sticky DataTable styles
export const MainPageContent = styled.div`
  flex: 1;
  flex-basis: 0;
  overflow: auto;
  margin: ${appKitDesignTokens.marginForPageContent};
`;
