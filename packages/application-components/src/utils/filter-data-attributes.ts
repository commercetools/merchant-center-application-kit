import omitBy from 'lodash/omitBy';

export default function filterDataAttributes<T extends object>(obj: T) {
  return omitBy<T>(obj, (_value, key) => !key.startsWith('data-'));
}
