import selectProjectKeyFromLocalStorage from '../select-project-key-from-local-storage';

const getPreviousProjectKey = (defaultProjectKeyOfUser: string) => {
  const previouslyUsedProjectKeyFromLocalStorage = selectProjectKeyFromLocalStorage();
  if (previouslyUsedProjectKeyFromLocalStorage)
    return previouslyUsedProjectKeyFromLocalStorage;
  if (defaultProjectKeyOfUser) return defaultProjectKeyOfUser;

  return null;
};

export default getPreviousProjectKey;
