import React from 'react';
import { MessageDescriptor } from 'react-intl';
import buttonMessages from '../../../utils/button-messages';
import ModalPage from '../internals/modal-page';
import ModalPageHeader from '../internals/modal-page-header';
import ModalPageHeaderDefaultControls from '../internals/modal-page-header-default-controls';
import { ContentWrapper } from '../internals/modal-page.styles';

type Label = string | MessageDescriptor;
type CommonProps = {
  level?: number;
  title: string;
  isOpen: boolean;
  onClose?: (event: React.SyntheticEvent) => void;
  children: React.ReactNode;
  zIndex?: number;
  baseZIndex?: number;
  getParentSelector?: () => HTMLElement;
  shouldDelayOnClose?: boolean;
  // TopBar Props
  topBarCurrentPathLabel?: string;
  topBarPreviousPathLabel: Label;
  // Header Props
  subtitle?: string | React.ReactElement;
  isPrimaryButtonDisabled?: boolean;
  dataAttributesPrimaryButton?: { [key: string]: string };
  dataAttributesSecondaryButton?: { [key: string]: string };
};
type PropsWithCustomControls = CommonProps & {
  customControls: React.ReactNode;
};
type PropsWithoutCustomControls = CommonProps & {
  labelSecondaryButton: Label;
  labelPrimaryButton: Label;
  onSecondaryButtonClick: (event: React.SyntheticEvent) => void;
  onPrimaryButtonClick: (event: React.SyntheticEvent) => void;
};
type Props = PropsWithCustomControls | PropsWithoutCustomControls;
const defaultProps: Pick<
  PropsWithoutCustomControls,
  'labelPrimaryButton' | 'labelSecondaryButton'
> = {
  labelPrimaryButton: buttonMessages.confirm,
  labelSecondaryButton: buttonMessages.cancel,
};

// Type-guard validation for the correct props, based on the existence `customControls`
const hasCustomControls = (props: Props): props is PropsWithCustomControls =>
  'customControls' in props && props.customControls !== undefined;

const FormModalPage = (props: Props) => (
  <ModalPage
    level={props.level}
    title={props.title}
    isOpen={props.isOpen}
    zIndex={props.zIndex}
    onClose={props.onClose}
    baseZIndex={props.baseZIndex}
    currentPathLabel={props.topBarCurrentPathLabel || props.title}
    previousPathLabel={props.topBarPreviousPathLabel}
    getParentSelector={props.getParentSelector}
    shouldDelayOnClose={props.shouldDelayOnClose}
  >
    <ModalPageHeader title={props.title} subtitle={props.subtitle}>
      {hasCustomControls(props) ? (
        props.customControls
      ) : (
        <ModalPageHeaderDefaultControls
          labelSecondaryButton={props.labelSecondaryButton}
          labelPrimaryButton={props.labelPrimaryButton}
          isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
          onSecondaryButtonClick={props.onSecondaryButtonClick}
          onPrimaryButtonClick={props.onPrimaryButtonClick}
          dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
          dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
        />
      )}
    </ModalPageHeader>
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
FormModalPage.displayName = 'FormModalPage';
FormModalPage.defaultProps = defaultProps;
FormModalPage.Intl = buttonMessages;

export default FormModalPage;
