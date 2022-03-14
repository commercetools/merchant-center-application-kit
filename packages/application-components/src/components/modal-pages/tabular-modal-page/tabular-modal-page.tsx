import type { CSSObject } from '@emotion/react';

import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import { sharedMessages } from '@commercetools-frontend/i18n';
import ModalPage from '../internals/modal-page';
import ModalPageHeaderTitle from '../internals/modal-page-header-title';
import { ContentWrapper } from '../internals/modal-page.styles';
import {
  FormPrimaryButton,
  FormSecondaryButton,
  FormDeleteButton,
} from '../internals/default-form-buttons';

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
  level?: number;
  title: string;
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  children: ReactNode;
  zIndex?: number;
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
  hideControls: boolean;
};

const defaultProps: Pick<Props, 'hideControls'> = {
  hideControls: false,
};

const TabularModalPage = (props: Props) => (
  <ModalPage
    level={props.level}
    title={props.title}
    isOpen={props.isOpen}
    zIndex={props.zIndex}
    onClose={props.onClose}
    baseZIndex={props.baseZIndex}
    topBarColor="neutral"
    currentPathLabel={props.topBarCurrentPathLabel || props.title}
    previousPathLabel={props.topBarPreviousPathLabel}
    getParentSelector={props.getParentSelector}
    shouldDelayOnClose={props.shouldDelayOnClose}
    afterOpenStyles={props.afterOpenStyles}
  >
    <div
      css={css`
        background-color: ${customProperties.colorNeutral95};
        padding: ${customProperties.spacingM} ${customProperties.spacingM} 0;
        border-bottom: 1px ${customProperties.colorNeutral} solid;
      `}
    >
      <Spacings.Stack>
        {props.customTitleRow || (
          <ModalPageHeaderTitle title={props.title} subtitle={props.subtitle} />
        )}
        <div
          css={css`
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              margin-top: 8px;
            `}
            role="tablist"
          >
            {props.tabControls}
          </div>
          <div
            css={css`
              margin-bottom: 16px;
            `}
          >
            {!props.hideControls && props.formControls && (
              <Spacings.Inline alignItems="flex-end">
                {props.formControls}
              </Spacings.Inline>
            )}
          </div>
        </div>
      </Spacings.Stack>
    </div>
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
TabularModalPage.displayName = 'TabularModalPage';
TabularModalPage.defaultProps = defaultProps;
// Static export of pre-configured form control buttons to easily re-use
// them in the custom controls.
TabularModalPage.FormPrimaryButton = FormPrimaryButton;
TabularModalPage.FormSecondaryButton = FormSecondaryButton;
TabularModalPage.FormDeleteButton = FormDeleteButton;
// This is a convenience proxy export to expose pre-defined Intl messages defined in the `@commercetools-frontend/i18n` package.
// The Intl messages can be used for button labels.
TabularModalPage.Intl = sharedMessages;

export default TabularModalPage;
