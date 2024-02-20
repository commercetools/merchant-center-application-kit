import { SyntheticEvent, ReactNode } from 'react';
import DialogContainer from '../internals/dialog-container';
import DialogContent from '../internals/dialog-content';
import DialogHeader from '../internals/dialog-header';

type Props = {
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  size?: 'm' | 'l' | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 16 | 'scale';
  zIndex?: number;
  title?: string | ReactNode;
  children: ReactNode;
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
