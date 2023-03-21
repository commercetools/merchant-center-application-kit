import type {
  TI18NImportData,
  TMessageTranslations,
  TMessageStructuredJson,
} from './export-types';

export const extractLanguageTagFromLocale = (locale: string): string =>
  locale.includes('-') ? locale.split('-')[0] : locale;

export const isStructuredJson = (
  message: TMessageTranslations | TMessageStructuredJson
): message is TMessageStructuredJson =>
  (message as TMessageStructuredJson)?.string !== undefined;

export const parseChunkImport = (
  chunkImport: TI18NImportData
): TMessageTranslations => {
  // Prefer loading `default` (for ESM bundles) and
  // fall back to normal import (for CJS bundles).
  const contents = chunkImport.default || chunkImport;

  return Object.entries(contents).reduce(
    (messages, [messageKey, messageValue]) => {
      const messageAsString = isStructuredJson(messageValue)
        ? messageValue.string
        : messageValue;

      return {
        ...messages,
        [messageKey]: messageAsString,
      };
    },
    {} as TMessageTranslations
  );
};

export const mergeMessages = (
  ...messages: TMessageTranslations[]
): TMessageTranslations => Object.assign({}, ...messages);

export const mapLocaleToIntlLocale = (locale: string): string => {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr-FR';
  if (locale === 'zh-CN') return 'zh-CN';
  return 'en';
};
