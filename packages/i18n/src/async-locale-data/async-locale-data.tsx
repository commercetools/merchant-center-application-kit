import type {
  TMessagesAsync,
  TMessageTranslations,
} from './use-async-intl-messages';

import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { extractLanguageTagFromLocale, mergeMessages } from '../utils';
import loadI18n from '../load-i18n';
import useAsyncIntlMessages from './use-async-intl-messages';

export type TMessages = {
  [key: string]: TMessageTranslations;
};
export type TRenderFunctionResult = {
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
  children: (state: TRenderFunctionResult) => React.ReactNode;
};

const getMessagesForLocale = (data?: TMessages, locale?: string) => {
  if (!data || !locale) return {};
  if (data[locale]) return data[locale];
  const fallbackLanguage = extractLanguageTagFromLocale(locale);
  return data[fallbackLanguage];
};

const useAsyncLocaleData = ({
  locale,
  applicationMessages,
}: Pick<Props, 'locale' | 'applicationMessages'>) => {
  const loadApplicationMessages = React.useCallback(
    async (locale: string) => {
      if (typeof applicationMessages === 'function') {
        return await applicationMessages(locale);
      }
      return getMessagesForLocale(applicationMessages, locale);
    },
    [applicationMessages]
  );
  const messagesFromKitResult = useAsyncIntlMessages({
    locale,
    loader: loadI18n,
  });
  const applicationMessagesResult = useAsyncIntlMessages({
    locale,
    loader: loadApplicationMessages,
  });

  // Merge the loaded messages into one
  return {
    isLoading:
      messagesFromKitResult.isLoading || applicationMessagesResult.isLoading,
    messages: mergeMessages(
      messagesFromKitResult.messages ?? {},
      applicationMessagesResult.messages ?? {}
    ),
    error: messagesFromKitResult.error ?? applicationMessagesResult.error,
  };
};

const AsyncLocaleData = (props: Props) => {
  const { isLoading, messages, error } = useAsyncLocaleData(props);

  React.useEffect(() => {
    if (error) reportErrorToSentry(error, {});
  }, [error]);

  return (
    <>
      {props.children({
        isLoading,
        locale: isLoading ? undefined : props.locale,
        messages: error ? undefined : messages,
      })}
    </>
  );
};

export { AsyncLocaleData, useAsyncLocaleData };
