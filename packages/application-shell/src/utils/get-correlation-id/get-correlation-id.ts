import uuid from 'uuid/v4';
import selectProjectKeyFromUrl from '../select-project-key-from-url';

const VALID_ID_PART_FORMAT = /^[\w-/]+$/;

const skipMalformedPart = (part?: string | null) =>
  part && VALID_ID_PART_FORMAT.test(part);

export default function getCorrelationId({
  userId,
}: { userId?: string | null } = {}) {
  return ['mc', selectProjectKeyFromUrl(), userId, uuid()]
    .filter(skipMalformedPart)
    .join('/');
}
