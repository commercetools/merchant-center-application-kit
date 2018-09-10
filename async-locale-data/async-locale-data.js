import React from 'react';
import PropTypes from 'prop-types';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import loadI18n from '../load-i18n';

export const extractLanguageFromLocale = locale =>
  locale.includes('-') ? locale.split('-')[0] : locale;

export const extractCountryFromLocale = locale =>
  locale.includes('-') ? locale.split('-')[1].toLowerCase() : '';

class AsyncLocaleData extends React.Component {
  static displayName = 'AsyncLocaleData';
  static propTypes = {
    children: PropTypes.func.isRequired,
    // The locale is optional, which indicates that we don't know yet
    // which locale data should be loaded.
    // This is important in order to avoid loading different locales and
    // therefore causing flashing of translated content on subsequent re-renders.
    locale: PropTypes.string,
  };

  state = {
    isLoading: true,
    language: null,
    messages: null,
  };

  componentDidMount() {
    if (this.props.locale) this.loadLocaleData(this.props.locale);
  }

  componentDidUpdate(prevProps) {
    if (this.props.locale && prevProps.locale !== this.props.locale) {
      this.loadLocaleData(this.props.locale);
    }
  }

  loadLocaleData = locale => {
    const language = extractLanguageFromLocale(locale);
    const country = extractCountryFromLocale(locale);
    loadI18n(language, country).then(
      data => {
        this.setState({
          isLoading: false,
          language,
          messages: data,
        });
      },
      error => reportErrorToSentry(error, {})
    );
  };

  render() {
    return this.props.children(this.state);
  }
}

export default AsyncLocaleData;
