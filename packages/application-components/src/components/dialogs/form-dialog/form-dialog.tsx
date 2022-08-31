import type { SyntheticEvent, ReactNode, ReactElement } from 'react';
import { sharedMessages } from '@commercetools-frontend/i18n';
import DialogContainer from '../internals/dialog-container';
import DialogHeader from '../internals/dialog-header';
import DialogContent from '../internals/dialog-content';
import DialogFooter from '../internals/dialog-footer';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};
type Label = string | MessageDescriptor;
type Props = {
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  title: string;
  size?: 'm' | 'l' | 7 | 8 | 9 | 10 | 'scale';
  zIndex?: number;
  children: ReactNode;
  labelSecondary: Label;
  labelPrimary: Label;
  isPrimaryButtonDisabled?: boolean;
  onSecondaryButtonClick: (event: SyntheticEvent) => void;
  onPrimaryButtonClick: (event: SyntheticEvent) => void;
  dataAttributesSecondaryButton?: { [key: string]: string };
  dataAttributesPrimaryButton?: { [key: string]: string };
  getParentSelector?: () => HTMLElement;
  iconLeftSecondaryButton?: ReactElement;
};
const defaultProps: Pick<Props, 'labelSecondary' | 'labelPrimary'> = {
  labelSecondary: sharedMessages.cancel,
  labelPrimary: sharedMessages.save,
};

const FormDialog = (props: Props) => (
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
    <DialogFooter
      labelSecondary={props.labelSecondary}
      labelPrimary={props.labelPrimary}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onCancel={props.onSecondaryButtonClick}
      onConfirm={props.onPrimaryButtonClick}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
      iconLeftSecondaryButton={props.iconLeftSecondaryButton}
    />
  </DialogContainer>
);
FormDialog.displayName = 'FormDialog';
FormDialog.defaultProps = defaultProps;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
FormDialog.Intl = sharedMessages;

export default FormDialog;
