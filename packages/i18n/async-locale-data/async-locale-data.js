import React from 'react';
import PropTypes from 'prop-types';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { extractLanguageTagFromLocale } from '../utils';
import loadI18n from '../load-i18n';

const mergeMessages = (...messages) => Object.assign({}, ...messages);

const getMessagesForLocale = (data, locale) => {
  if (!data || !locale) return {};
  if (data[locale]) return data[locale];
  const fallbackLanguage = extractLanguageTagFromLocale(locale);
  return data[fallbackLanguage];
};

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
  static getMessagesForLocale = getMessagesForLocale;

  state = {
    isLoading: true,
    locale: null,
    messages: null,
  };

  isUnmounting = false;

  componentDidMount() {
    if (this.props.locale) this.loadLocaleData(this.props.locale);
  }

  componentDidUpdate(prevProps) {
    if (this.props.locale && prevProps.locale !== this.props.locale) {
      this.loadLocaleData(this.props.locale);
    }
  }

  componentWillUnmount() {
    this.isUnmounting = true;
  }

  loadLocaleData = async locale => {
    let applicationMessagePromise = null;

    if (typeof this.props.applicationMessages === 'function') {
      applicationMessagePromise = this.props.applicationMessages(locale);
    }

    const messageFetchingPromises = applicationMessagePromise
      ? [loadI18n(locale), applicationMessagePromise]
      : [loadI18n(locale)];

    try {
      const [messages, applicationMessages] = await Promise.all(
        messageFetchingPromises
      );
      if (!this.isUnmounting) {
        this.setState({
          isLoading: false,
          locale,
          messages: mergeMessages(
            messages,
            applicationMessages ||
              getMessagesForLocale(this.props.applicationMessages, locale)
          ),
        });
      }
    } catch (error) {
      reportErrorToSentry(error, {});
    }
  };

  render() {
    return this.props.children(this.state);
  }
}

export default AsyncLocaleData;
