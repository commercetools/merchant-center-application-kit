const staticUrlPathsInPositionOfProjectKey = ['login', 'logout', 'account'];

// Attempt to extract the `:projectKey` from the URL.
// If the value matches one of the values in the list above,
// return `undefined` as we're not within a project context.
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

  return staticUrlPathsInPositionOfProjectKey.includes(possibleProjectKey)
    ? undefined
    : possibleProjectKey;
}
