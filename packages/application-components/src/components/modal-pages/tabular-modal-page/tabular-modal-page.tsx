import React from 'react';
import { MessageDescriptor } from 'react-intl';
import { css } from '@emotion/core';
import { customProperties, Spacings } from '@commercetools-frontend/ui-kit';
import buttonMessages from '../../../utils/button-messages';
import ModalPage from '../internals/modal-page';
import ModalPageHeaderTitle from '../internals/modal-page-header-title';
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
  topBarPreviousPathLabel?: Label;
  // Replaces the title/subtitle row with a custom one (for special use cases)
  customTitleRow?: React.ReactNode;
  // Pass tab components
  tabControls: React.ReactNode;
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
        <Spacings.Inline alignItems="flex-end" justifyContent="space-between">
          <div
            css={css`
              margin-top: 8px;
            `}
          >
            {props.tabControls}
          </div>
          <div
            css={css`
              margin-bottom: 16px !important;
            `}
          >
            {hasCustomControls(props) ? (
              props.customControls
            ) : (
              <ModalPageHeaderDefaultControls
                labelSecondaryButton={props.labelSecondaryButton}
                labelPrimaryButton={props.labelPrimaryButton}
                isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
                onSecondaryButtonClick={props.onSecondaryButtonClick}
                onPrimaryButtonClick={props.onPrimaryButtonClick}
                dataAttributesSecondaryButton={
                  props.dataAttributesSecondaryButton
                }
                dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
              />
            )}
          </div>
        </Spacings.Inline>
      </Spacings.Stack>
    </div>
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
TabularModalPage.displayName = 'TabularModalPage';
TabularModalPage.defaultProps = defaultProps;
TabularModalPage.Intl = buttonMessages;

export default TabularModalPage;
