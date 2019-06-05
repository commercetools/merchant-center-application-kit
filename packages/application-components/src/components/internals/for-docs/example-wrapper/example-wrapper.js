import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { IntlProvider } from 'react-intl';
import { customProperties } from '@commercetools-frontend/ui-kit';
import ModalController from '../modal-controller';

const ExampleWrapper = props => (
  <ThemeProvider
    theme={{
      // Reset theme to default styles, so that the example uses the default uikit tokens
      fontFamilyDefault: customProperties.fontFamilyDefault,
      colorSolid: customProperties.colorsSolid,
    }}
  >
    <IntlProvider locale="en">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          border: `1px solid ${customProperties.colorNeutral95}`,
        }}
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
