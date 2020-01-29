// eslint-disable-next-line import/named
import { EnhancedLocation } from 'history-query-enhancer';

export { default as version } from './version';

export { default, createEnhancedHistory } from './enhanced-history';

// Convenience types
export type TEnhancedLocation<Q extends {}> = EnhancedLocation<Q>;
