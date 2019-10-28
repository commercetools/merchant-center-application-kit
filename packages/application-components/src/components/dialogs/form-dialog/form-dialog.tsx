import React from 'react';
import { MessageDescriptor } from 'react-intl';
import { commonMessages } from '@commercetools-frontend/i18n';
import DialogContainer from '../internals/dialog-container';
import DialogHeader from '../internals/dialog-header';
import DialogContent from '../internals/dialog-content';
import DialogFooter from '../internals/dialog-footer';

type Label = string | MessageDescriptor;
type Props = {
  isOpen: boolean;
  onClose?: (event: React.SyntheticEvent) => void;
  title: string;
  size?: 'm' | 'l' | 'scale';
  zIndex?: number;
  children: React.ReactNode;
  labelSecondary: Label;
  labelPrimary: Label;
  isPrimaryButtonDisabled?: boolean;
  onSecondaryButtonClick: (event: React.SyntheticEvent) => void;
  onPrimaryButtonClick: (event: React.SyntheticEvent) => void;
  dataAttributesSecondaryButton?: { [key: string]: string };
  dataAttributesPrimaryButton?: { [key: string]: string };
  getParentSelector?: () => HTMLElement;
};
const defaultProps: Pick<Props, 'labelSecondary' | 'labelPrimary'> = {
  labelSecondary: commonMessages.cancel,
  labelPrimary: commonMessages.save,
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
    />
  </DialogContainer>
);
FormDialog.displayName = 'FormDialog';
FormDialog.defaultProps = defaultProps;
// Make some default intl messages available to use
FormDialog.Intl = commonMessages;

export default FormDialog;
