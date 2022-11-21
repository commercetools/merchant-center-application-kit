import styled from '@emotion/styled';
import { designTokens as appKitDesignTokens } from '../../../theming';

// The overflow should be "auto", to make the container scrollable
const DialogContent = styled.div`
  border-top: 1px solid ${appKitDesignTokens.borderColorForDialogDivider};
  padding: ${appKitDesignTokens.paddingForDialogContent};
  flex: 1;
  overflow: auto;
`;

export default DialogContent;
