import styled from '@emotion/styled';
import { designTokens as appKitDesignTokens } from '../../theming';

export const ContentWrapper = styled.div`
  flex: 1;
  flex-basis: 0%;
  margin: ${appKitDesignTokens.marginForPageContent};
  overflow: auto;
`;

export const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
