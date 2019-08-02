import omitBy from 'lodash/omitBy';

const regexpData = /^data-/;

export default function filterDataAttributes<T extends object>(obj: T) {
  return omitBy<T>(obj, (_value, key) => !regexpData.test(key));
}
