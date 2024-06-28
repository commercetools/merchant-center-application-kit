import chalk from 'chalk';

type TMessageFormat = 'simple' | 'transifex';

function getI18nMessageFormat(source: string): TMessageFormat {
  const messageContents = JSON.parse(source);
  const firstValue = Object.values(messageContents)[0];
  return typeof firstValue === 'string' ? 'simple' : 'transifex';
}

function handleMessageCompilationError(
  fileIdentifier: string,
  error: unknown,
  warnFunction: (e: Error) => void
): void {
  if (!process.env.CI) {
    warnFunction(
      new Error(
        `[i18n message compilation] Message compilation on ${fileIdentifier} has failed.\n` +
          `Consider setting the environmental variable ${chalk.yellow(
            'DISABLE_I18N_MESSAGE_COMPILATION'
          )} to true to disable the message loader or resolve the issues on the messages file.\n` +
          `${error instanceof Error ? `Error: ${error.message}` : ''}`
      )
    );
  }
}

export { getI18nMessageFormat, handleMessageCompilationError };
