import uuid from 'uuid/v4';
import selectProjectKeyFromUrl from '../select-project-key-from-url';

const VALID_ID_PART_FORMAT = /^[\w-/]+$/;

const skipMalformedPart = (part?: string) =>
  part && VALID_ID_PART_FORMAT.test(part);

export default function getCorrelationId({ userId }: { userId?: string } = {}) {
  return ['mc', selectProjectKeyFromUrl(), userId, uuid()]
    .filter(skipMalformedPart)
    .join('/');
}
