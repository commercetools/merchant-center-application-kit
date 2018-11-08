import uuid from 'uuid/v4';
import selectProjectKeyFromUrl from '../select-project-key-from-url';

export default function getCorrelationId({ userId } = {}) {
  return ['mc', selectProjectKeyFromUrl(), userId, uuid()]
    .filter(Boolean)
    .join('/');
}
