import styled from '@emotion/styled';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  padding: ${uiKitDesignTokens.spacingXl} 0;
  justify-content: center;
  background-size: cover;
  background-position: center;
`;

export const ContainerColumn = styled.div`
  width: calc(${uiKitDesignTokens.constraint16} / 2);
`;
export const ContainerColumnWide = styled.div`
  width: ${uiKitDesignTokens.constraint15};
`;
