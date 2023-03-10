import { SyntheticEvent, ReactNode, ReactElement } from 'react';
import type { CSSObject } from '@emotion/react';

import { sharedMessages } from '@commercetools-frontend/i18n';
import CustomFormModalPage from '../custom-form-modal-page';

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
  isPrimaryButtonDisabled?: boolean;
  isSecondaryButtonDisabled?: boolean;
  dataAttributesPrimaryButton?: { [key: string]: string };
  dataAttributesSecondaryButton?: { [key: string]: string };
  labelPrimaryButton?: Label;
  labelSecondaryButton?: Label;
  onPrimaryButtonClick: (event: SyntheticEvent) => void;
  onSecondaryButtonClick: (event: SyntheticEvent) => void;
  hideControls: boolean;
  iconLeftSecondaryButton?: ReactElement;
};

const defaultProps: Pick<Props, 'hideControls'> = {
  hideControls: false,
};

const FormModalPage = (props: Props) => (
  <CustomFormModalPage
    title={props.title}
    subtitle={props.subtitle}
    isOpen={props.isOpen}
    zIndex={props.zIndex}
    onClose={props.onClose}
    topBarCurrentPathLabel={props.topBarCurrentPathLabel}
    topBarPreviousPathLabel={props.topBarPreviousPathLabel}
    getParentSelector={props.getParentSelector}
    shouldDelayOnClose={props.shouldDelayOnClose}
    hideControls={props.hideControls}
    afterOpenStyles={props.afterOpenStyles}
    formControls={
      <>
        <CustomFormModalPage.FormSecondaryButton
          label={props.labelSecondaryButton}
          onClick={props.onSecondaryButtonClick}
          isDisabled={props.isSecondaryButtonDisabled}
          dataAttributes={props.dataAttributesSecondaryButton}
          iconLeft={props.iconLeftSecondaryButton}
        />
        <CustomFormModalPage.FormPrimaryButton
          label={props.labelPrimaryButton}
          onClick={props.onPrimaryButtonClick}
          isDisabled={props.isPrimaryButtonDisabled}
          dataAttributes={props.dataAttributesPrimaryButton}
        />
      </>
    }
  >
    {props.children}
  </CustomFormModalPage>
);
FormModalPage.displayName = 'FormModalPage';
FormModalPage.defaultProps = defaultProps;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
FormModalPage.Intl = sharedMessages;

export default FormModalPage;
