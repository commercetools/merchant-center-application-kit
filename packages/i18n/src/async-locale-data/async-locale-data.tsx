import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { extractLanguageTagFromLocale, mergeMessages } from '../utils';
import loadI18n from '../load-i18n';

export type TMessageTranslations = {
  [key: string]: string;
};
export type TMessages = {
  [key: string]: TMessageTranslations;
};
export type TMessagesAsync = (locale: string) => Promise<TMessageTranslations>;
export type State = {
  isLoading: boolean;
  locale?: string;
  messages?: TMessageTranslations;
};
export type Props = {
  // The locale is optional, which indicates that we don't know yet
  // which locale data should be loaded.
  // This is important in order to avoid loading different locales and
  // therefore causing flashing of translated content on subsequent re-renders.
  locale?: string;
  applicationMessages: TMessages | TMessagesAsync;
  children: (state: State) => React.ReactNode;
};

const getMessagesForLocale = (data?: TMessages, locale?: string) => {
  if (!data || !locale) return {};
  if (data[locale]) return data[locale];
  const fallbackLanguage = extractLanguageTagFromLocale(locale);
  return data[fallbackLanguage];
};

const loadApplicationMessages = async (
  applicationMessagesOrAsyncFunction: TMessages | TMessagesAsync,
  locale: string
): Promise<TMessageTranslations> => {
  if (typeof applicationMessagesOrAsyncFunction === 'function') {
    return applicationMessagesOrAsyncFunction(locale);
  }
  return getMessagesForLocale(applicationMessagesOrAsyncFunction, locale);
};

class AsyncLocaleData extends React.Component<Props, State> {
  static displayName = 'AsyncLocaleData';

  state = {
    isLoading: true,
    locale: undefined,
    messages: undefined,
  };

  isUnmounting = false;

  componentDidMount() {
    if (this.props.locale) this.loadLocaleData(this.props.locale);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.locale && prevProps.locale !== this.props.locale) {
      this.loadLocaleData(this.props.locale);
    }
  }

  componentWillUnmount() {
    this.isUnmounting = true;
  }

  loadLocaleData = async (locale: string) => {
    try {
      if (!this.isUnmounting) {
        const messages = await loadI18n(locale);
        const applicationMessages = await loadApplicationMessages(
          this.props.applicationMessages,
          locale
        );
        this.setState({
          isLoading: false,
          locale,
          messages: mergeMessages(messages, applicationMessages),
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
