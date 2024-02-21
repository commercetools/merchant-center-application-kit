import { SyntheticEvent, ReactNode } from 'react';
import DialogContainer from '../internals/dialog-container';
import DialogContent from '../internals/dialog-content';
import DialogHeader, { TextTitle } from '../internals/dialog-header';

export type TInfoDialogProps = {
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  size?: 'm' | 'l' | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 16 | 'scale';
  zIndex?: number;
  title: ReactNode;
  ariaTitle?: string;
  children: ReactNode;
  getParentSelector?: () => HTMLElement;
};

const InfoDialog = (props: TInfoDialogProps) => (
  <DialogContainer
    isOpen={props.isOpen}
    onClose={props.onClose}
    size={props.size}
    zIndex={props.zIndex}
    title={props.title}
    ariaTitle={props.ariaTitle}
    getParentSelector={props.getParentSelector}
  >
    <DialogHeader title={props.title} onClose={props.onClose} />
    <DialogContent>{props.children}</DialogContent>
  </DialogContainer>
);
InfoDialog.displayName = 'InfoDialog';

// Allow consumers who want to use a custom title to reuse the same title styles
// as the default dialog title.
InfoDialog.TextTitle = TextTitle;

export default InfoDialog;
