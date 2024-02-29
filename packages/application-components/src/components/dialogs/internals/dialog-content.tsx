import styled from '@emotion/styled';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';

// The overflow should be "auto", to make the container scrollable
const DialogContent = styled.div`
  border-top: 1px solid ${uiKitDesignTokens.colorNeutral90};
  padding: ${uiKitDesignTokens.spacing40} 0 0;
  flex: 1;
  overflow: auto;
`;

export default DialogContent;
