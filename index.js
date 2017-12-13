import { createHistory, useBeforeUnload } from 'history';
import { useRouterHistory } from 'react-router';
// NOTE: this is hopefully a temporary workaround until RR v4 is released.
// https://github.com/mjackson/history/issues/379#issuecomment-257007458
// The problem was that somehow the `listenBeforeUnload` function was not
// available anymore in the history, causing the router leave hook to do nothing
// This solution has been taken from:
// https://github.com/ReactTraining/react-router/issues/3147#issuecomment-200572190
export default useBeforeUnload(useRouterHistory(createHistory))();
