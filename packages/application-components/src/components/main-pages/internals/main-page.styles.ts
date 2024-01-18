import styled from '@emotion/styled';
import { designTokens as appKitDesignTokens } from '../../../theming';

// Bear in mind the paddings are dependant on the context the component
// is rendered in. For example, when rendered in a custom view, its panel
// already contains default paddings, so we don't need to add them here.
export const MainPageContainer = styled.div`
  padding: ${appKitDesignTokens.paddingForMainPageHeader};
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
  margin: ${appKitDesignTokens.marginForPageContent};
`;
