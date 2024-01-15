import styled from '@emotion/styled';
import { CUSTOM_EXTENSION_TYPES } from '@commercetools-frontend/constants';
import { designTokens as appKitDesignTokens } from '../../theming';

export const ContentWrapper = styled.div`
  flex: 1;
  flex-basis: 0;
  overflow: auto;
  // Bear in mind the margins are dependant on the context the component
  // is rendered in. For example, when rendered in a custom view, its panel
  // already contains default paddings, so we don't need to add margins here.
  margin: ${appKitDesignTokens.marginForPageContent};
  body[data-extension-type='${CUSTOM_EXTENSION_TYPES.CUSTOM_VIEW}'] & {
    margin: ${appKitDesignTokens.marginForPageContentInCustomView};
  }
`;

export const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
