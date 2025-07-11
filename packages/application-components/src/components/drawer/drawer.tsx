import type { ReactElement, ReactNode, SyntheticEvent } from 'react';
import styled, { type CSSObject } from '@emotion/styled';
import { useIntl } from 'react-intl';
import { sharedMessages } from '@commercetools-frontend/i18n';
import {
  designTokens as uiKitDesignTokens,
  type TIconProps,
} from '@commercetools-uikit/design-system';
import { CloseIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { designTokens as appKitDesignTokens } from '../../theming';
import {
  FormPrimaryButton,
  FormSecondaryButton,
} from '../internals/default-form-buttons';
import messages from '../internals/messages';
import PageHeaderTitle from '../internals/page-header-title';
import ModalPage from '../modal-pages/internals/modal-page';
import { LargeIconWrapper } from '../modal-pages/utils';

type MessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage?: string;
};
type Label = string | MessageDescriptor;

type TDrawerSize = 10 | 20 | 30;

type TDrawerProps = {
  size?: TDrawerSize;
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  children: ReactNode;
  topBarColor?: 'neutral' | 'surface';
  // Header Props
  title: string;
  subtitle?: string;

  zIndex?: number;
  getParentSelector?: () => HTMLElement;
  shouldDelayOnClose?: boolean;
  afterOpenStyles?: string | CSSObject;

  // Controls Props
  hideControls?: boolean;
  formControls?: ReactNode;
  isPrimaryButtonDisabled?: boolean;
  isSecondaryButtonDisabled?: boolean;
  dataAttributesPrimaryButton?: { [key: string]: string };
  dataAttributesSecondaryButton?: { [key: string]: string };
  labelPrimaryButton?: Label;
  labelSecondaryButton?: Label;
  onPrimaryButtonClick?: (event: SyntheticEvent) => void;
  onSecondaryButtonClick?: (event: SyntheticEvent) => void;
  iconLeftSecondaryButton?: ReactElement<TIconProps>;
};

const ContentWrapper = styled.div`
  flex: 1;
  flex-basis: 0;
  margin: ${appKitDesignTokens.marginForPageContent};
  overflow: auto;
`;

const HeaderWrapper = styled.div`
  padding: ${uiKitDesignTokens.spacing40} 40px;
  border-bottom: 1px solid ${uiKitDesignTokens.colorNeutral90};
`;

function Drawer({
  size = 10,
  hideControls = false,
  onPrimaryButtonClick = () => {},
  onSecondaryButtonClick = () => {},
  ...props
}: TDrawerProps) {
  const intl = useIntl();
  return (
    <ModalPage
      isOpen={props.isOpen}
      hidePathLabel
      hideTopBar
      onClose={props.onClose}
      size={size}
      title={props.title}
      afterOpenStyles={props.afterOpenStyles}
      getParentSelector={props.getParentSelector}
      shouldDelayOnClose={props.shouldDelayOnClose}
      topBarColor={props.topBarColor}
      zIndex={props.zIndex}
    >
      <HeaderWrapper>
        <Spacings.Stack>
          <Spacings.Inline justifyContent="space-between">
            <PageHeaderTitle
              title={props.title}
              titleSize="medium"
              subtitle={
                props.subtitle && <Text.Detail>{props.subtitle}</Text.Detail>
              }
            />
            {props.onClose && (
              <SecondaryIconButton
                label={intl.formatMessage(messages.close)}
                onClick={props.onClose}
                icon={
                  <LargeIconWrapper>
                    <CloseIcon />
                  </LargeIconWrapper>
                }
                size="40"
              />
            )}
          </Spacings.Inline>

          <Spacings.Inline justifyContent="flex-end">
            {!hideControls && props.formControls && props.formControls}

            {!hideControls && !props.formControls && (
              <>
                <FormSecondaryButton
                  label={props.labelSecondaryButton}
                  onClick={onSecondaryButtonClick}
                  isDisabled={props.isSecondaryButtonDisabled}
                  dataAttributes={props.dataAttributesSecondaryButton}
                  iconLeft={props.iconLeftSecondaryButton}
                />
                <FormPrimaryButton
                  label={props.labelPrimaryButton}
                  onClick={onPrimaryButtonClick}
                  isDisabled={props.isPrimaryButtonDisabled}
                  dataAttributes={props.dataAttributesPrimaryButton}
                />
              </>
            )}
          </Spacings.Inline>
        </Spacings.Stack>
      </HeaderWrapper>

      <ContentWrapper>{props.children}</ContentWrapper>
    </ModalPage>
  );
}

Drawer.displayName = 'Drawer';
// Static export of pre-configured form control buttons to easily re-use
// them in the custom controls.
Drawer.FormPrimaryButton = FormPrimaryButton;
Drawer.FormSecondaryButton = FormSecondaryButton;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
Drawer.Intl = sharedMessages;

export default Drawer;
