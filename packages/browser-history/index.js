import { createBrowserHistory } from 'history';
import withQuery from 'history-query-enhancer';
import { encode, decode } from 'qss';

// Note: the "?" needs to be removed.
const parse = search => decode(search.substring(1));

export const createEnhancedHistory = withQuery({ parse, stringify: encode });

const browserHistory = createEnhancedHistory(createBrowserHistory());

export default browserHistory;
