import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

const hideAppLoader = () => {
  /**
   * NOTE:
   *   This function is defined in the `index.html` in a script-tag
   *   by the `html-template.js` in the `mc-scripts`. There are
   *   alternative ways of acheiving this namely:
   *   1. Using custom events and dispatching here
   *     - Not supported in IE11 and would need a polyfill
   *   2. Removing the DOM node here
   *     - Both `index.html` and this component would have to
   *       now the div's id/class. If one would change the index.html
   *       the app would never show (always show the loading screen)
   */
  if (window.onAppLoaded) window.onAppLoaded();
};

const ConfigureIntlProvider = props => {
  React.useEffect(() => {
    if (props.locale) {
      hideAppLoader();
    }
  }, [props.locale]);

  if (!props.locale) {
    return null;
  }

  return (
    <IntlProvider locale={props.locale} messages={props.messages}>
      {props.children}
    </IntlProvider>
  );
};

ConfigureIntlProvider.displayName = 'ConfigureIntlProvider';
ConfigureIntlProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default ConfigureIntlProvider;
