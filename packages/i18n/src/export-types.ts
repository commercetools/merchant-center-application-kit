import type { MessageFormatElement } from '@formatjs/icu-messageformat-parser';
import type { Props } from './async-locale-data/async-locale-data';

export type TMessageStructuredJson = {
  string: string;
  developer_comment?: string;
  context?: string;
  character_limit?: string;
};

export type TMessageTranslations =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>;

export type TMergedMessages =
  | TMessageTranslations
  | Record<string, TMessageStructuredJson>;

export type TI18NImportData = {
  default: TMergedMessages;
};

export type TAsyncLocaleDataProps = Props;
