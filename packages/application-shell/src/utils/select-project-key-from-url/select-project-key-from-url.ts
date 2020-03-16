const staticUrlPathsInPositionOfProjectKey = ['login', 'logout', 'account'];
import { location } from '../location';

// Attempt to extract the `:projectKey` from the URL.
// If the value matches one of the values in the list above,
// return `undefined` as we're not within a project context.
export default function selectProjectKeyFromUrl(
  locationPath = location.pathname
) {
  const possibleProjectKey = locationPath.split('/')[1];

  return staticUrlPathsInPositionOfProjectKey.includes(possibleProjectKey)
    ? undefined
    : possibleProjectKey;
}
