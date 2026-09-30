import { useEffect, useState } from 'react';
import type { TMessageTranslations } from '../export-types';

export type TMessageTranslationsAsync = (
  locale: string
) => Promise<TMessageTranslations>;
export type TState = {
  isLoading: boolean;
  messages?: TMessageTranslations;
  error?: Error;
  // The locale `messages` belong to. Lags behind the requested locale while a
  // second load is in flight.
  loadedLocale?: string;
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
        const messages = await loader(_locale);
        // Checked after the await, not before it. The cleanup runs on every
        // `locale` change, not only on unmount, so a load the effect has
        // already superseded would otherwise still commit its result. Since
        // `loadedLocale` is the sole gate on reporting any locale, a slow
        // loader landing an older locale after a newer one could leave the
        // pair permanently disagreeing with nothing to retrigger it.
        if (_isUnmounting) return;
        setState({ isLoading: false, messages, loadedLocale: _locale });
      } catch (error) {
        if (_isUnmounting) return;
        if (error instanceof Error) {
          // Carry the locale on the error path too. The pair check below is
          // keyed on it, so omitting it here means a failed load can never
          // satisfy the check and the consumer never receives a locale again.
          setState({ isLoading: false, error, loadedLocale: _locale });
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
