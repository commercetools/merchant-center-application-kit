import React from 'react';
import PropTypes from 'prop-types';
import once from 'lodash.once';
import { IntlProvider } from 'react-intl';

const hideAppLoader = once(() => {
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
});

const ConfigureIntlProvider = props => {
  hideAppLoader();
  return (
    // In case the language is not defined yet, we temporary fall back to `en` so
    // that react-intl does not complain.
    <IntlProvider
      locale={props.language || 'en'}
      messages={props.messages || {}}
    >
      {props.children}
    </IntlProvider>
  );
};

ConfigureIntlProvider.displayName = 'ConfigureIntlProvider';
ConfigureIntlProvider.propTypes = {
  language: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default ConfigureIntlProvider;
