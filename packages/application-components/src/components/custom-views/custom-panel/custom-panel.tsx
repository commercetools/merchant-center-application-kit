import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import ModalPage from '../../modal-pages/internals/modal-page';

type TCustomPanelProps = {
  title: string;
  size: 'small' | 'large';
  onClose: () => void;
  children: ReactNode;
};

const ContentWrapper = styled.div`
  padding: ${designTokens.spacing40} 40px;
`;

function CustomPanel(props: TCustomPanelProps) {
  return (
    <ModalPage
      hidePathLabel
      isOpen
      onClose={props.onClose}
      size={props.size}
      title={props.title}
    >
      <ContentWrapper>{props.children}</ContentWrapper>
    </ModalPage>
  );
}

export default CustomPanel;
