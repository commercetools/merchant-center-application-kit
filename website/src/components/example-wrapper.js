import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { css } from '@emotion/core';
import { IntlProvider } from 'react-intl';
import { customProperties } from '@commercetools-frontend/ui-kit';
import ModalController from './modal-controller';

const ExampleWrapper = props => (
  <ThemeProvider
    theme={{
      // Reset theme to default styles, so that the example uses the default uikit tokens
      fontFamilyDefault: customProperties.fontFamilyDefault,
      colorSolid: customProperties.colorSolid,
    }}
  >
    <IntlProvider locale="en">
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
        `}
      >
        <div id={props.containerId} style={{ flex: 1 }} />
        <ModalController
          title={props.controllerTitle}
          buttonLabel={props.controllerButtonLabel}
        >
          {props.children}
        </ModalController>
      </div>
    </IntlProvider>
  </ThemeProvider>
);
ExampleWrapper.displayName = 'ExampleWrapper';
ExampleWrapper.propTypes = {
  containerId: PropTypes.string.isRequired,
  controllerTitle: PropTypes.string.isRequired,
  controllerButtonLabel: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default ExampleWrapper;
