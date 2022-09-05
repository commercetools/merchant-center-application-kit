import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

// The overflow should be "auto", to make the container scrollable
const DialogContent = styled.div`
  border-top: 1px solid ${designTokens.colorNeutral};
  padding: ${designTokens.spacingM} 0 ${designTokens.spacingS};
  flex: 1;
  overflow: auto;
`;

export default DialogContent;
