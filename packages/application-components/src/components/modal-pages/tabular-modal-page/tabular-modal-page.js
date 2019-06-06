import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { css } from '@emotion/core';
import { customProperties, Spacings } from '@commercetools-frontend/ui-kit';
import buttonMessages from '../../../utils/button-messages';
import ModalPage from '../internals/modal-page';
import ModalPageTopBar from '../internals/modal-page-top-bar';
import ModalPageHeaderTitle from '../internals/modal-page-header-title';
import ModalPageHeaderDefaultControls from '../internals/modal-page-header-default-controls';
import { ContentWrapper } from '../internals/modal-page.styles';

const TabularModalPage = props => (
  <ModalPage
    level={props.level}
    title={props.title}
    isOpen={props.isOpen}
    zIndex={props.zIndex}
    onClose={props.onClose}
    baseZIndex={props.baseZIndex}
    parentSelector={props.parentSelector}
  >
    <ModalPageTopBar
      color="neutral"
      onClose={props.onClose}
      currentPathLabel={props.topBarCurrentPathLabel || props.title}
      previousPathLabel={props.topBarPreviousPathLabel}
    />
    <div
      css={css`
        background-color: ${customProperties.colorNeutral95};
        padding: ${customProperties.spacingM} ${customProperties.spacingM} 0;
      `}
    >
      <Spacings.Stack size="l">
        {props.customTitleRow || (
          <ModalPageHeaderTitle
            title={props.title}
            titleSize="big"
            subtitle={props.subtitle}
          />
        )}
        <Spacings.Inline alignItems="center" justifyContent="space-between">
          {props.tabControls}
          {props.customControls || (
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
        </Spacings.Inline>
      </Spacings.Stack>
    </div>
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
TabularModalPage.displayName = 'TabularModalPage';
TabularModalPage.propTypes = {
  level: PropTypes.number,
  title: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  baseZIndex: PropTypes.number,
  parentSelector: PropTypes.string,
  // For topbar
  topBarCurrentPathLabel: PropTypes.string,
  topBarPreviousPathLabel: PropTypes.string,
  // For header
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  // Replaces the title/subtitle row with a custom one (for special use cases)
  customTitleRow: PropTypes.node,
  // Pass tab components
  tabControls: PropTypes.node.isRequired,
  // Replaces default control buttons
  customControls: PropTypes.node,
  // For default control buttons
  labelSecondaryButton: requiredIf(
    PropTypes.oneOfType([
      PropTypes.string,
      // intl message
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
      }),
    ]),
    props => !props.customControls
  ),
  labelPrimaryButton: requiredIf(
    PropTypes.oneOfType([
      PropTypes.string,
      // intl message
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
      }),
    ]),
    props => !props.customControls
  ),
  onSecondaryButtonClick: requiredIf(
    PropTypes.func,
    props => !props.customControls
  ),
  onPrimaryButtonClick: requiredIf(
    PropTypes.func,
    props => !props.customControls
  ),
  isPrimaryButtonDisabled: PropTypes.bool,
  dataAttributesPrimaryButton: PropTypes.object,
  dataAttributesSecondaryButton: PropTypes.object,
};
TabularModalPage.defaultProps = {
  labelPrimaryButton: buttonMessages.confirm,
  labelSecondaryButton: buttonMessages.cancel,
};

TabularModalPage.Intl = buttonMessages;

export default TabularModalPage;
