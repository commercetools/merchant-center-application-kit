import React from 'react';
import PropTypes from 'prop-types';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import isFunction from 'lodash.isfunction';
import loadI18n from '../load-i18n';

export const extractLanguageFromLocale = locale =>
  locale.includes('-') ? locale.split('-')[0] : locale;

export const isPromiseLike = obj =>
  !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';

class AsyncLocaleData extends React.Component {
  static displayName = 'AsyncLocaleData';
  static propTypes = {
    children: PropTypes.func.isRequired,
    // The locale is optional, which indicates that we don't know yet
    // which locale data should be loaded.
    // This is important in order to avoid loading different locales and
    // therefore causing flashing of translated content on subsequent re-renders.
    locale: PropTypes.string,
    applicationMessages: PropTypes.object,
    fetchApplicationMessages: PropTypes.func,
  };

  state = {
    isLoading: true,
    language: null,
    messages: null,
    applicationMessages: null,
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

    const applicationMessagePromise =
      this.props.fetchApplicationMessages &&
      isFunction(this.props.fetchApplicationMessages)
        ? this.props.fetchApplicationMessages(language)
        : null;

    let promises = [loadI18n(language)];

    if (isPromiseLike(applicationMessagePromise)) {
      promises = promises.concat([applicationMessagePromise]);
    }

    Promise.all(promises).then(
      response => {
        this.setState({
          isLoading: false,
          language,
          messages: response[0],
          applicationMessages: response[1]
            ? response[1]
            : this.props.applicationMessages[language],
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
