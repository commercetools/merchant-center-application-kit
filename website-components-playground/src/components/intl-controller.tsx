import { type ReactNode, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useAsyncLocaleData } from '@commercetools-frontend/i18n';
import { getSupportedLocales } from '@commercetools-frontend/l10n';

export type TAvailableLocaleOption = {
  label: string;
  value: string;
};
export type TIntlControllerFunctionOptions = {
  locale: string;
  setLocale: (nextLocale: string) => void;
  availableLocaleOptions: TAvailableLocaleOption[];
};
type TIntlControllerProps = {
  children: (options: TIntlControllerFunctionOptions) => ReactNode;
};

const namifyLocale = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'es':
      return 'Español';
    case 'de':
      return 'Deutsch';
    case 'fr-FR':
      return 'Français';
    case 'pt-BR':
      return 'Português brasileiro';
    case 'zh-CN':
      return '简化字';
    default:
      return locale;
  }
};

const availableLocaleOptions = getSupportedLocales().map((locale) => ({
  label: namifyLocale(locale),
  value: locale,
}));

const loadApplicationMessages = () => Promise.resolve({});

const IntlController = (props: TIntlControllerProps) => {
  const [activeLocale, setActiveLocale] = useState('en');
  const { messages } = useAsyncLocaleData({
    locale: activeLocale,
    applicationMessages: loadApplicationMessages,
  });
  return (
    <IntlProvider locale={activeLocale} messages={messages}>
      {props.children({
        locale: activeLocale,
        setLocale: setActiveLocale,
        availableLocaleOptions,
      })}
    </IntlProvider>
  );
};
IntlController.displayName = 'IntlController';

export default IntlController;
