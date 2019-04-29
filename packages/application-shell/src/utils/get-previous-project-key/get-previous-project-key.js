import selectProjectKeyFromLocalStorage from '../select-project-key-from-local-storage';

const getPreviousProjectKey = defaultProjectKeyOfUser => {
  const previouslyUsedProjectKeyFromLocalStorage = selectProjectKeyFromLocalStorage();
  if (previouslyUsedProjectKeyFromLocalStorage)
    return previouslyUsedProjectKeyFromLocalStorage;
  if (defaultProjectKeyOfUser) return defaultProjectKeyOfUser;

  return null;
};

export default getPreviousProjectKey;
