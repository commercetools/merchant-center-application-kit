import styled from '@emotion/styled';
import { designTokens as appKitDesignTokens } from '../../../theming';

export const MainPageContainer = styled.div`
  padding: ${appKitDesignTokens.paddingForPageHeader};
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
  padding: ${appKitDesignTokens.paddingForPageContent};
`;
