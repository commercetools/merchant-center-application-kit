import { isStaticUrlPathInPositionOfProjectKey } from '@commercetools-frontend/constants';

// Attempt to extract the `:projectKey` from the URL.
// If the value matches one of the static URL paths in the position of the
// project key, return `undefined` as we're not within a project context.
export default function selectProjectKeyFromUrl(
  locationPath = window.location.pathname
) {
  let possibleProjectKey = '';
  const pathParts = locationPath.split('/');

  if (pathParts[1] === 'custom-views') {
    // Custom Views paths: /custom-views/:customViewId/projects/:projectKey
    possibleProjectKey = pathParts[4];
  } else {
    // Application paths: /:projectKey/:applicationId
    possibleProjectKey = pathParts[1];
  }

  return isStaticUrlPathInPositionOfProjectKey(possibleProjectKey)
    ? undefined
    : possibleProjectKey;
}
