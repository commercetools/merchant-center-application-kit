import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

export const MainPageContainer = styled.div`
  padding: ${designTokens.spacingL};
`;

export const Divider = styled.hr`
  background-color: ${designTokens.colorNeutral60};
  height: 1px;
  border: 0;
`;

export const MainPageContent = styled.div`
  overflow: auto;
`;
