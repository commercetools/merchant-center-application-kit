import uuid from 'uuid/v4';
import selectProjectKey from '../select-project-key';
import selectUserId from '../select-user-id';

export default () =>
  ['mc', selectProjectKey(), selectUserId(), uuid()].filter(Boolean).join('/');
