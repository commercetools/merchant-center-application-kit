import styled from '@emotion/styled';
import { CUSTOM_EXTENSION_TYPES } from '@commercetools-frontend/constants';
import { designTokens as appKitDesignTokens } from '../../theming';

export const ContentWrapper = styled.div`
  flex: 1;
  flex-basis: 0;
  margin: ${appKitDesignTokens.marginForPageContent};
  overflow: auto;
  body[data-extension-type='${CUSTOM_EXTENSION_TYPES.CUSTOM_VIEW}'] & {
    margin: ${appKitDesignTokens.marginForPageContentInCustomView};
  }
`;

export const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
