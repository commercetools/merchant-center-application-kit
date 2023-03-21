import { useEffect, useState } from 'react';
import type { MergedMessages } from '../export-types';

export type TMessageTranslationsAsync = (
  locale: string
) => Promise<MergedMessages>;
export type TState = {
  isLoading: boolean;
  messages?: MergedMessages;
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
