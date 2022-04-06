import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';

export const ContentWrapper = styled.div`
  flex: 1;
  flex-basis: 0;
  padding: ${customProperties.spacingM};
  overflow: auto;
`;

export const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
