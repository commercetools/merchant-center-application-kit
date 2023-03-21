import type { MessageFormatElement } from '@formatjs/icu-messageformat-parser';
import type { Props } from './async-locale-data/async-locale-data';

export type TMessageStructuredJson = {
  string: string;
  developer_comment?: string;
  context?: string;
  character_limit?: string;
};

export type MergedMessages =
  | Record<string, string>
  | Record<string, MessageFormatElement[]>
  | Record<string, TMessageStructuredJson>;

export type I18NImportData = {
  default: MergedMessages;
};

export type TAsyncLocaleDataProps = Props;
export type TI18NImportData = I18NImportData;
export type TMergedMessages = MergedMessages;
