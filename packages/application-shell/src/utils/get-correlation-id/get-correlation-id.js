import uuid from 'uuid/v4';
import selectProjectKeyFromUrl from '../select-project-key-from-url';
import selectUserId from '../select-user-id';

export default cache =>
  ['mc', selectProjectKeyFromUrl(), selectUserId(cache), uuid()]
    .filter(Boolean)
    .join('/');
