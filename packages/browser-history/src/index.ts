// eslint-disable-next-line import/named
import type { State } from 'history';
import type { EnhancedLocation, EnhancedHistory } from './with-query';

export { default as version } from './version';

export { default, createEnhancedHistory } from './enhanced-history';

// Convenience types
export type TEnhancedHistory<
  Q extends {},
  S extends State = State
> = EnhancedHistory<Q, S>;
export type TEnhancedLocation<
  Q extends {},
  S extends State = State
> = EnhancedLocation<Q, S>;
