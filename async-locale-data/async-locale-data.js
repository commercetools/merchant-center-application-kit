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
    locale: PropTypes.string.isRequired,
  };

  state = {
    language: 'en',
    messages: null,
  };

  componentDidMount() {
    const language = extractLanguageFromLocale(this.props.locale);
    const country = extractCountryFromLocale(this.props.locale);
    loadI18n(language, country).then(
      data => {
        this.setState({
          language,
          messages: data,
        });
      },
      error => reportErrorToSentry(error, {})
    );
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.locale || prevProps.locale !== this.props.locale) {
      const language = extractLanguageFromLocale(this.props.locale);
      const country = extractCountryFromLocale(this.props.locale);
      loadI18n(language, country).then(
        data => {
          this.setState({
            language,
            messages: data,
          });
        },
        error => reportErrorToSentry(error, {})
      );
    }
  }

  render() {
    return this.props.children({
      language: this.state.language,
      messages: this.state.messages,
    });
  }
}

export default AsyncLocaleData;
