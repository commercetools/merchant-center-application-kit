import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import type { CSSObject } from '@emotion/react';
import { sharedMessages } from '@commercetools-frontend/i18n';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import CustomViewsSelector from '../../custom-views/custom-views-selector';
import type { TCustomViewSelectorProps } from '../../custom-views/custom-views-selector/types';
import {
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
} from '../../internals/default-form-buttons';
import PageHeaderTitle from '../../internals/page-header-title';
import { ModalContentWrapper } from '../../internals/page.styles';
import {
  ControlsContainter,
  TabularPageContainer,
  TabularModalPageContainer,
  FormControlsContainer,
  CustomViewsSelectorWrapper,
} from '../../internals/tabular-page';
import ModalPage from '../internals/modal-page';

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
  /**
   * These codes are used to configure which Custom Views are available for every tab.
   */
  customViewLocatorCodes?: TCustomViewSelectorProps['customViewLocatorCodes'];
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
  // Replaces the title/subtitle row with a custom one (for special use cases)
  customTitleRow?: ReactNode;
  // Pass tab components
  tabControls: ReactNode;
  // Header Props
  subtitle?: string | ReactElement;
  formControls?: ReactNode;
  hideControls?: boolean;
};

const TabularModalPage = ({ hideControls = false, ...props }: Props) => {
  return (
    <ModalPage
      title={props.title}
      isOpen={props.isOpen}
      zIndex={props.zIndex}
      onClose={props.onClose}
      topBarColor="neutral"
      currentPathLabel={props.topBarCurrentPathLabel || props.title}
      previousPathLabel={props.topBarPreviousPathLabel}
      getParentSelector={props.getParentSelector}
      shouldDelayOnClose={props.shouldDelayOnClose}
      afterOpenStyles={props.afterOpenStyles}
    >
      <TabularModalPageContainer>
        <TabularPageContainer>
          {props.customTitleRow || (
            <PageHeaderTitle
              title={props.title}
              titleSize="big"
              subtitle={props.subtitle}
              truncate
            />
          )}
          <ControlsContainter
            tabControls={props.tabControls}
            formControls={
              <FormControlsContainer>
                {!hideControls && props.formControls && (
                  <Spacings.Inline alignItems="flex-end">
                    {props.formControls}
                  </Spacings.Inline>
                )}
              </FormControlsContainer>
            }
          />
        </TabularPageContainer>
      </TabularModalPageContainer>
      <CustomViewsSelectorWrapper>
        <CustomViewsSelector
          margin={`${uiKitDesignTokens.spacing30} 0 0 0`}
          customViewLocatorCodes={props.customViewLocatorCodes}
        />
      </CustomViewsSelectorWrapper>
      <ModalContentWrapper>{props.children}</ModalContentWrapper>
    </ModalPage>
  );
};
TabularModalPage.displayName = 'TabularModalPage';
// Static export of pre-configured form control buttons to easily re-use
// them in the custom controls.
TabularModalPage.FormPrimaryButton = FormPrimaryButton;
TabularModalPage.FormSecondaryButton = FormSecondaryButton;
TabularModalPage.FormDeleteButton = FormDeleteButton;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
TabularModalPage.Intl = sharedMessages;

export default TabularModalPage;
