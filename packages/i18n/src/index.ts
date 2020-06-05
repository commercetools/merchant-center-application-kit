import type { Props } from './async-locale-data/async-locale-data';

export type TAsyncLocaleDataProps = Props;

export { default as version } from './version';

export {
  AsyncLocaleData,
  useAsyncLocaleData,
  useAsyncIntlMessages,
} from './async-locale-data';
export { default as sharedMessages } from './shared-messages';
