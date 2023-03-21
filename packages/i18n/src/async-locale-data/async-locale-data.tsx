import { useEffect, ReactNode, useCallback } from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import type { TMessageTranslations } from '../export-types';
import loadI18n from '../load-i18n';
import { extractLanguageTagFromLocale, mergeMessages } from '../utils';
import useAsyncIntlMessages from './use-async-intl-messages';

export type TMessageTranslationsAsync = (
  locale: string
) => Promise<TMessageTranslations>;
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
  applicationMessages:
    | { [locale: string]: TMessageTranslations }
    | TMessageTranslationsAsync;
  children: (state: TRenderFunctionResult) => ReactNode;
};

const getMessagesForLocale = (
  data?: { [locale: string]: TMessageTranslations },
  locale?: string
) => {
  if (!data || !locale) return {};
  if (data[locale]) return data[locale];
  const fallbackLanguage = extractLanguageTagFromLocale(locale);
  return data[fallbackLanguage];
};

const useAsyncLocaleData = ({
  locale,
  applicationMessages,
}: Pick<Props, 'locale' | 'applicationMessages'>) => {
  const loadApplicationMessages = useCallback(
    async (locale: string) => {
      if (typeof applicationMessages === 'function') {
        return await applicationMessages(locale);
      }
      return getMessagesForLocale(applicationMessages, locale);
    },
    // NOTE: we assume that the `applicationMessages` argument never changes.
    // Therefore, we disable the dependency array to not depend on that argument.
    // This is important, to avoid potential infinite loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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

  useEffect(() => {
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
