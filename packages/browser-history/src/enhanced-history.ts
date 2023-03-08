import { createBrowserHistory, createMemoryHistory } from 'history';
import withQuery from 'history-query-enhancer';
import { encode, decode } from 'qss';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

function parse<Q extends {}>(search: string): Q {
  // Note: the "?" needs to be removed.
  return decode(search.substring(1)) as Q;
}

export const createEnhancedHistory = withQuery({ parse, stringify: encode });

const browserHistory = createEnhancedHistory(
  // For SSR compatibility
  canUseDOM ? createBrowserHistory() : createMemoryHistory()
);

export default browserHistory;
