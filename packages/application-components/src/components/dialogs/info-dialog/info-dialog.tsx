import React from 'react';
import DialogContainer from '../internals/dialog-container';
import DialogHeader from '../internals/dialog-header';
import DialogContent from '../internals/dialog-content';

type Props = {
  isOpen: boolean;
  onClose?: (event: React.SyntheticEvent) => void;
  size?: 'm' | 'l' | 7 | 8 | 9 | 10 | 'scale';
  zIndex?: number;
  title: string;
  children: React.ReactNode;
  getParentSelector?: () => HTMLElement;
};

const InfoDialog = (props: Props) => (
  <DialogContainer
    isOpen={props.isOpen}
    onClose={props.onClose}
    size={props.size}
    zIndex={props.zIndex}
    title={props.title}
    getParentSelector={props.getParentSelector}
  >
    <DialogHeader title={props.title} onClose={props.onClose} />
    <DialogContent>{props.children}</DialogContent>
  </DialogContainer>
);
InfoDialog.displayName = 'InfoDialog';

export default InfoDialog;
