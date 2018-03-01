import createBrowserHistory from 'history/createBrowserHistory';
import withQuery from 'history-query-enhancer';
import queryString from 'query-string';

const history = withQuery(queryString)(createBrowserHistory());

export default history;
