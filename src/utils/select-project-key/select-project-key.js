// this will try to extract the project-key from the url
export default () => {
  const staticUrlPathsInPositionOfProjectKey = ['login', 'logout', 'account'];
  const possibleProjectKey = window.location.pathname.split('/')[1];

  return staticUrlPathsInPositionOfProjectKey.includes(possibleProjectKey)
    ? undefined
    : possibleProjectKey;
};
