import React from 'react';
import { MessageDescriptor } from 'react-intl';
import buttonMessages from '../../../utils/button-messages';
import ModalPage from '../internals/modal-page';
import ModalPageHeader from '../internals/modal-page-header';
import { ContentWrapper } from '../internals/modal-page.styles';
import { Spacings } from '@commercetools-frontend/ui-kit';
import {
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
} from '../../../utils/default-form-buttons';

type Label = string | MessageDescriptor;
type Props = {
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
  // Controls Props
  formControls: React.ReactNode;
  hideControls?: boolean;
};

const CustomFormModalPage = (props: Props) => (
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
      {!props.hideControls && props.formControls && (
        <Spacings.Inline alignItems="flex-end">
          {props.formControls}
        </Spacings.Inline>
      )}
    </ModalPageHeader>
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
CustomFormModalPage.displayName = 'CustomFormModalPage';
CustomFormModalPage.Intl = buttonMessages;
CustomFormModalPage.FormPrimaryButton = FormPrimaryButton;
CustomFormModalPage.FormSecondaryButton = FormSecondaryButton;
CustomFormModalPage.FormDeleteButton = FormDeleteButton;

export default CustomFormModalPage;
