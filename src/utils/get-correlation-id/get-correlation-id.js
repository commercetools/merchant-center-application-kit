import uuid from 'uuid/v4';
import selectProjectKeyFromUrl from '../select-project-key-from-url';
import selectUserId from '../select-user-id';

export default () =>
  ['mc', selectProjectKeyFromUrl(), selectUserId(), uuid()]
    .filter(Boolean)
    .join('/');
