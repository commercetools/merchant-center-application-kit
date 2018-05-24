import { __LOCAL, __GLOBAL } from './constants';

export const isLocalAction = action => action && action.type === __LOCAL;
export const isGlobalAction = action => action && action.type === __GLOBAL;
