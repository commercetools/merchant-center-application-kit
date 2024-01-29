import styled from '@emotion/styled';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { designTokens as appKitDesignTokens } from '../../theming';

export const ContentWrapper = styled.div`
  flex: 1;
  flex-basis: 0;
  overflow: auto;
  margin: ${appKitDesignTokens.marginForPageContent};
`;

export const ModalContentWrapper = styled.div`
  flex: 1;
  flex-basis: 0;
  overflow: auto;
  margin: ${uiKitDesignTokens.spacing50} ${uiKitDesignTokens.spacing55};
`;

export const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
