import React from 'react';
import PropTypes from 'prop-types';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';

export const extractLanguageFromLocale = locale =>
  locale.includes('-') ? locale.split('-')[0] : locale;

export const languageChanged = (prevLocale, nextLocale) =>
  extractLanguageFromLocale(prevLocale) !==
  extractLanguageFromLocale(nextLocale);

class AsyncLocaleMessages extends React.Component {
  static displayName = 'AsyncLocaleMessages';
  static propTypes = {
    children: PropTypes.func.isRequired,
    loadI18n: PropTypes.func.isRequired,
    locale: PropTypes.string,
  };

  state = {
    messages: null,
  };

  componentDidMount() {
    const locale = extractLanguageFromLocale(this.props.locale);
    this.props.loadI18n(locale).then(
      data => {
        this.setState({
          messages: data,
        });
      },
      error => reportErrorToSentry(error, {})
    );
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.locale ||
      languageChanged(prevProps.locale, this.props.locale)
    ) {
      const locale = extractLanguageFromLocale(this.props.locale);
      this.props.loadI18n(locale).then(
        data => {
          this.setState({
            messages: data,
          });
        },
        error => reportErrorToSentry(error, {})
      );
    }
  }

  render() {
    return this.props.children({
      messages: this.state.messages,
    });
  }
}

export default AsyncLocaleMessages;
