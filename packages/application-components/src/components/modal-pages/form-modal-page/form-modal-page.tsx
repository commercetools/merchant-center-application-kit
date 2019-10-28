import React from 'react';
import { MessageDescriptor } from 'react-intl';
import { sharedMessages } from '@commercetools-frontend/i18n';
import ModalPage from '../internals/modal-page';
import ModalPageHeader from '../internals/modal-page-header';
import ModalPageHeaderDefaultControls from '../internals/modal-page-header-default-controls';
import { ContentWrapper } from '../internals/modal-page.styles';

type Label = string | MessageDescriptor;
// [conditional A]
type WithCustomControls = {
  customControls?: React.ReactNode;
};
// [conditional B]
type WithoutCustomControls = {
  labelSecondaryButton?: Label;
  labelPrimaryButton?: Label;
  onSecondaryButtonClick?: (event: React.SyntheticEvent) => void;
  onPrimaryButtonClick?: (event: React.SyntheticEvent) => void;
};
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
  topBarPreviousPathLabel?: Label;
  // Header Props
  subtitle?: string | React.ReactElement;
  isPrimaryButtonDisabled?: boolean;
  dataAttributesPrimaryButton?: { [key: string]: string };
  dataAttributesSecondaryButton?: { [key: string]: string };
};
type Props = CommonProps & WithCustomControls & WithoutCustomControls;
type PropsWithCustomControls = CommonProps & Required<WithCustomControls>;
type PropsWithoutCustomControls = CommonProps & Required<WithoutCustomControls>;
const defaultProps: Pick<
  Props,
  'labelPrimaryButton' | 'labelSecondaryButton'
> = {
  labelPrimaryButton: sharedMessages.confirm,
  labelSecondaryButton: sharedMessages.cancel,
};

// Type-guard validation for the correct props, based on the existence `customControls`
const hasCustomControls = (
  props: PropsWithCustomControls | PropsWithoutCustomControls
): props is PropsWithCustomControls =>
  'customControls' in props && props.customControls !== undefined;
const getConditionalProps = (props: Props) => {
  if ('customControls' in props && props.customControls !== undefined) {
    return props as PropsWithCustomControls;
  }
  return props as PropsWithoutCustomControls;
};

const FormModalPageHeaderControls = (
  props: PropsWithCustomControls | PropsWithoutCustomControls
) => {
  if (hasCustomControls(props)) {
    return <>{props.customControls}</>;
  }
  return (
    <ModalPageHeaderDefaultControls
      labelSecondaryButton={props.labelSecondaryButton}
      labelPrimaryButton={props.labelPrimaryButton}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onSecondaryButtonClick={props.onSecondaryButtonClick}
      onPrimaryButtonClick={props.onPrimaryButtonClick}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
    />
  );
};

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
      <FormModalPageHeaderControls {...getConditionalProps(props)} />
    </ModalPageHeader>
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
FormModalPage.displayName = 'FormModalPage';
FormModalPage.defaultProps = defaultProps;
FormModalPage.Intl = sharedMessages;

export default FormModalPage;
