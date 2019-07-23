import { createBrowserHistory } from 'history';
import withQuery from 'history-query-enhancer';
import { encode, decode } from 'qss';

function parse<Q extends {}>(search: string): Q {
  // Note: the "?" needs to be removed.
  return decode(search.substring(1)) as Q;
}

export const createEnhancedHistory = withQuery({ parse, stringify: encode });

const browserHistory = createEnhancedHistory(createBrowserHistory());

export default browserHistory;
