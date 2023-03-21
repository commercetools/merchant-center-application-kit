import type { MergedMessages } from './export-types';

export const extractLanguageTagFromLocale = (locale: string): string =>
  locale.includes('-') ? locale.split('-')[0] : locale;

export const mergeMessages = (...messages: MergedMessages[]): MergedMessages =>
  Object.assign({}, ...messages);

export const mapLocaleToIntlLocale = (locale: string): string => {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr-FR';
  if (locale === 'zh-CN') return 'zh-CN';
  return 'en';
};
