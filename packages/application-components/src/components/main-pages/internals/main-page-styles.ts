import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';

export const MainPageContainer = styled.div`
  padding: ${customProperties.spacingL};
`;

export const Divider = styled.hr`
  background-color: ${customProperties.colorNeutral60};
  height: 1px;
  border: 0;
`;

export const MainPageContent = styled.div`
  overflow: auto;
`;
