import styled from '@emotion/styled';
import { customProperties } from '@commercetools-frontend/ui-kit';

// The overflow should be "auto", to make the container scrollable
const DialogContent = styled.div`
  border-top: 1px solid ${customProperties.borderColorSeparator};
  padding: ${customProperties.spacingM} 0 ${customProperties.spacingS};
  flex: 1;
  overflow: auto;
`;

export default DialogContent;
