import { useEffect, useState } from 'react';
import type { MessageFormatElement } from '@formatjs/icu-messageformat-parser';

export type TMessageTranslations =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;
export type TMessageTranslationsAsync = (
  locale: string
) => Promise<TMessageTranslations>;
export type TState = {
  isLoading: boolean;
  messages?: TMessageTranslations;
  error?: Error;
};
export type THookOptions = {
  locale?: string;
  loader: TMessageTranslationsAsync;
};

const initialState: TState = {
  isLoading: true,
  messages: undefined,
  error: undefined,
};

// Low level hook to load messages for a specific locale. The loading is async
// because it's assumed that the translation files are dynamically imported (code splitted).
const useAsyncIntlMessages = ({ locale, loader }: THookOptions): TState => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let _isUnmounting = false;

    async function load(_locale: string) {
      try {
        if (!_isUnmounting) {
          const messages = await loader(_locale);
          setState({ isLoading: false, messages });
        }
      } catch (error) {
        if (error instanceof Error) {
          setState({ isLoading: false, error });
        }
      }
    }

    if (locale) load(locale);

    return () => {
      _isUnmounting = true;
    };
  }, [locale, loader]);

  return state;
};

export default useAsyncIntlMessages;
