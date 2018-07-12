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
    locale: PropTypes.string,
  };

  state = {
    locale: null,
    messages: null,
  };

  componentDidMount() {
    const lang = extractLanguageFromLocale(this.props.locale);
    const country = extractCountryFromLocale(this.props.locale);
    loadI18n(lang, country).then(
      data => {
        this.setState({
          messages: data,
          locale: lang,
        });
      },
      error => reportErrorToSentry(error, {})
    );
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.locale || prevProps.locale !== this.props.locale) {
      const lang = extractLanguageFromLocale(this.props.locale);
      const country = extractCountryFromLocale(this.props.locale);
      loadI18n(lang, country).then(
        data => {
          this.setState({
            messages: data,
            locale: lang,
          });
        },
        error => reportErrorToSentry(error, {})
      );
    }
  }

  render() {
    return this.props.children({
      locale: this.state.locale,
      messages: this.state.messages,
    });
  }
}

export default AsyncLocaleData;
