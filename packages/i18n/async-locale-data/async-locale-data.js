import React from 'react';
import PropTypes from 'prop-types';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import loadI18n from '../load-i18n';

const mergeMessages = (...messages) => Object.assign({}, ...messages);

export const extractLanguageFromLocale = locale =>
  locale.includes('-') ? locale.split('-')[0] : locale;

class AsyncLocaleData extends React.Component {
  static displayName = 'AsyncLocaleData';
  static propTypes = {
    children: PropTypes.func.isRequired,
    // The locale is optional, which indicates that we don't know yet
    // which locale data should be loaded.
    // This is important in order to avoid loading different locales and
    // therefore causing flashing of translated content on subsequent re-renders.
    locale: PropTypes.string,
    applicationMessages: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
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

  loadLocaleData = async locale => {
    const language = extractLanguageFromLocale(locale);

    let applicationMessagePromise = null;

    if (typeof this.props.applicationMessages === 'function') {
      applicationMessagePromise = this.props.applicationMessages(language);
    }

    const messageFetchingPromises = do {
      if (applicationMessagePromise) {
        [loadI18n(language), applicationMessagePromise];
      } else {
        [loadI18n(language)];
      }
    };

    try {
      const [messages, applicationMessages] = await Promise.all(
        messageFetchingPromises
      );
      this.setState({
        isLoading: false,
        language,
        messages: mergeMessages(
          messages,
          applicationMessages ||
            (this.props.applicationMessages &&
              this.props.applicationMessages[language])
        ),
      });
    } catch (error) {
      reportErrorToSentry(error, {});
    }
  };

  render() {
    return this.props.children(this.state);
  }
}

export default AsyncLocaleData;
