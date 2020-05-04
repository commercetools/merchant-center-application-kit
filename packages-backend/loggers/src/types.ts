import type { Format } from 'logform';

export type TLoggerOptions = {
  level?: string;
  silent?: boolean;
  json?: boolean;
  formatters?: Format[];
};

export type TAccessLoggerOptions = TLoggerOptions & {
  ignoreUrls?: string[];
};
