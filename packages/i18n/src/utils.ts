import type { MessageFormatElement } from 'intl-messageformat-parser';

export type TMessageTranslations =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;

export const extractLanguageTagFromLocale = (locale: string): string =>
  locale.includes('-') ? locale.split('-')[0] : locale;

export const mergeMessages = (
  ...messages: TMessageTranslations[]
): TMessageTranslations => Object.assign({}, ...messages);

export const mapLocaleToMomentLocale = (locale: string): string => {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr';
  if (locale === 'zh-CN') return 'zh-cn';
  if (locale.startsWith('ja')) return 'ja';
  return 'en-gb';
};

export const mapLocaleToIntlLocale = (locale: string): string => {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr-FR';
  if (locale === 'zh-CN') return 'zh-CN';
  if (locale.startsWith('ja')) return 'ja';
  return 'en';
};
