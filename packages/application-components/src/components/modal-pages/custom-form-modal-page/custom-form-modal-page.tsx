import type { CSSObject } from '@emotion/react';

import { SyntheticEvent, ReactNode, ReactElement } from 'react';
import { sharedMessages } from '@commercetools-frontend/i18n';
import ModalPage from '../internals/modal-page';
import PageHeader from '../../internals/page-header';
import { ContentWrapper } from '../../internals/page.styles';
import Spacings from '@commercetools-uikit/spacings';
import {
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
} from '../../internals/default-form-buttons';

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
  /**
   * @deprecated Not used anymore, as the value is controlled via the Stacking Layer System.
   */
  level?: number;
  title: string;
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  children: ReactNode;
  zIndex?: number;
  /**
   * @deprecated Not used anymore, as the value is controlled via the Stacking Layer System.
   */
  baseZIndex?: number;
  getParentSelector?: () => HTMLElement;
  shouldDelayOnClose?: boolean;
  afterOpenStyles?: string | CSSObject;
  // TopBar Props
  topBarCurrentPathLabel?: string;
  topBarPreviousPathLabel?: Label;
  // Header Props
  subtitle?: string | ReactElement;
  // Controls Props
  formControls?: ReactNode;
  hideControls?: boolean;
};

const CustomFormModalPage = (props: Props) => (
  <ModalPage
    title={props.title}
    isOpen={props.isOpen}
    zIndex={props.zIndex}
    onClose={props.onClose}
    currentPathLabel={props.topBarCurrentPathLabel || props.title}
    previousPathLabel={props.topBarPreviousPathLabel}
    getParentSelector={props.getParentSelector}
    shouldDelayOnClose={props.shouldDelayOnClose}
    afterOpenStyles={props.afterOpenStyles}
  >
    <PageHeader title={props.title} subtitle={props.subtitle}>
      {!props.hideControls && props.formControls && (
        <Spacings.Inline alignItems="flex-end">
          {props.formControls}
        </Spacings.Inline>
      )}
    </PageHeader>
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
CustomFormModalPage.displayName = 'CustomFormModalPage';
// Static export of pre-configured form control buttons to easily re-use
// them in the custom controls.
CustomFormModalPage.FormPrimaryButton = FormPrimaryButton;
CustomFormModalPage.FormSecondaryButton = FormSecondaryButton;
CustomFormModalPage.FormDeleteButton = FormDeleteButton;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
CustomFormModalPage.Intl = sharedMessages;

export default CustomFormModalPage;
