import flatMap from 'lodash/flatMap';
import { TLocalizedString } from '../../types/generated/ctp';
import { Command } from './types';

export const sanitize = (param: string) =>
  param
    // Replace all \ with \\ (to prevent generate escape characters)
    .replace(/\\/g, '\\\\')
    // Replace all " with \"
    .replace(/"/g, '\\"');

export const flattenResults = (results: Command[]): Command[] =>
  flatMap<Command, Omit<Command, 'subCommands'>>(results, result => {
    if (result.subCommands) {
      if (typeof result.subCommands === 'function') {
        return [result, ...flattenResults(result.subCommands())];
      }
      return [result, ...flattenResults(result.subCommands)];
    }
    return result;
  });

// Once ui-kit exposes its fallback mechanism, we can use the same one here
export const translate = (
  nameAllLocales: TLocalizedString[],
  projectDataLocale: string
) => {
  const matchedTranslation = nameAllLocales.find(
    translation => translation.locale === projectDataLocale && translation.value
  );
  if (matchedTranslation) return matchedTranslation.value;

  // Fall back to the first available locale
  if (nameAllLocales.length > 0) return nameAllLocales[0].value;
  return '';
};
