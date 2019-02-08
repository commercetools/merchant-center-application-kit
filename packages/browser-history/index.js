import createBrowserHistory from 'history/createBrowserHistory';
import withQuery from 'history-query-enhancer';
import { encode, decode } from 'qss';

// Note: the "?" needs to be removed.
const parse = search => decode(search.substring(1));

const history = withQuery({ parse, stringify: encode })(createBrowserHistory());

export default history;
