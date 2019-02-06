import createBrowserHistory from 'history/createBrowserHistory';
import withQuery from 'history-query-enhancer';
import { encode, decode } from 'qss';

const history = withQuery({ parse: decode, stringify: encode })(
  createBrowserHistory()
);

export default history;
