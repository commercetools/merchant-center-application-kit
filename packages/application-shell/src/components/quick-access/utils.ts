import type { TLocalizedString } from '../../types/generated/ctp';
import type { Command, ExecGraphQlQuery } from './types';

export const sanitize = (param: string) =>
  param
    // Replace all \ with \\ (to prevent generate escape characters)
    .replace(/\\/g, '\\\\')
    // Replace all " with \"
    .replace(/"/g, '\\"');

export const flattenCommands = async (
  results: Command[],
  execQuery: ExecGraphQlQuery
) => {
  async function flatten(commands: Command[]): Promise<Command[]> {
    return commands.reduce(async (prevPromise: Promise<Command[]>, command) => {
      const prevResults = await prevPromise;
      if (command.subCommands) {
        if (typeof command.subCommands === 'function') {
          const subCommands = await command.subCommands(execQuery);
          const flattenSubCommands = await flatten(subCommands);
          return [...prevResults, command, ...flattenSubCommands];
        }
        const flattenSubCommands = await flatten(command.subCommands);
        return [...prevResults, command, ...flattenSubCommands];
      }
      return [...prevResults, command];
    }, Promise.resolve([]));
  }

  return await flatten(results);
};

// Once ui-kit exposes its fallback mechanism, we can use the same one here
export const translate = (
  nameAllLocales: TLocalizedString[],
  projectDataLocale: string
) => {
  const matchedTranslation = nameAllLocales.find(
    (translation) =>
      translation.locale === projectDataLocale && translation.value
  );
  if (matchedTranslation) return matchedTranslation.value;

  // Fall back to the first available locale
  if (nameAllLocales.length > 0) return nameAllLocales[0].value;
  return '';
};
