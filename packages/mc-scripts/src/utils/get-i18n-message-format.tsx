type TMessageFormat = 'simple' | 'transifex';

function getI18nMessageFormat(source: string): TMessageFormat {
  const messageContents = JSON.parse(source);
  const firstValue = Object.values(messageContents)[0];
  return typeof firstValue === 'string' ? 'simple' : 'transifex';
}

export default getI18nMessageFormat;
