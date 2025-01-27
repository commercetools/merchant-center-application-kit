import type { SyntheticEvent, ReactNode, ReactElement } from 'react';
import { sharedMessages } from '@commercetools-frontend/i18n';
import type { TIconProps } from '@commercetools-uikit/design-system';
import DialogContainer from '../internals/dialog-container';
import DialogContent from '../internals/dialog-content';
import DialogFooter from '../internals/dialog-footer';
import DialogHeader, { TextTitle } from '../internals/dialog-header';

// NOTE: the `MessageDescriptor` type is exposed by `react-intl`.
// However, we need to explicitly define this otherwise the prop-types babel plugin
// does not recognize the object shape.
type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};
type Label = string | MessageDescriptor;
export type TFormDialogProps = {
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  title: ReactNode;
  'aria-label'?: string;
  size?: 'm' | 'l' | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 16 | 'scale';
  zIndex?: number;
  children: ReactNode;
  labelSecondary?: Label;
  labelPrimary?: Label;
  isPrimaryButtonDisabled?: boolean;
  onSecondaryButtonClick: (event: SyntheticEvent) => void;
  onPrimaryButtonClick: (event: SyntheticEvent) => void;
  dataAttributesSecondaryButton?: { [key: string]: string };
  dataAttributesPrimaryButton?: { [key: string]: string };
  getParentSelector?: () => HTMLElement;
  iconLeftSecondaryButton?: ReactElement<TIconProps>;
  footerContent?: ReactNode;
};

const FormDialog = ({
  labelSecondary = sharedMessages.cancel,
  labelPrimary = sharedMessages.save,
  ...props
}: TFormDialogProps) => (
  <DialogContainer
    isOpen={props.isOpen}
    onClose={props.onClose}
    size={props.size}
    zIndex={props.zIndex}
    title={props.title}
    aria-label={props['aria-label']}
    getParentSelector={props.getParentSelector}
  >
    <DialogHeader
      title={props.title}
      onClose={props.onClose}
      aria-label={props['aria-label']}
    />
    <DialogContent>{props.children}</DialogContent>
    <DialogFooter
      labelSecondary={labelSecondary}
      labelPrimary={labelPrimary}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onCancel={props.onSecondaryButtonClick}
      onConfirm={props.onPrimaryButtonClick}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
      iconLeftSecondaryButton={props.iconLeftSecondaryButton}
      footerContent={props.footerContent}
    />
  </DialogContainer>
);
FormDialog.displayName = 'FormDialog';
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
FormDialog.Intl = sharedMessages;
// Allow consumers who want to use a custom title to reuse the same title styles
// as the default dialog title.
FormDialog.TextTitle = TextTitle;

export default FormDialog;
