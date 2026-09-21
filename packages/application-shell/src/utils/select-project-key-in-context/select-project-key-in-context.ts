import { selectProjectKeyFromUrl } from '@commercetools-frontend/application-shell-connectors';
import { isProjectKeylessApplicationEntryPointInProjectContext } from '@commercetools-frontend/constants';
import getPreviousProjectKey from '../get-previous-project-key';

type TSelectProjectKeyInContextOptions = {
  pathname: string;
  defaultProjectKeyOfUser?: string;
};

// Resolves the project key the application runs in, which is usually the one
// in the URL. On paths like `/agent-sphere` the project key is not part of the
// URL, so it falls back to the previously used project.
const selectProjectKeyInContext = ({
  pathname,
  defaultProjectKeyOfUser,
}: TSelectProjectKeyInContextOptions) => {
  const projectKeyFromUrl = selectProjectKeyFromUrl(pathname);
  if (projectKeyFromUrl) return projectKeyFromUrl;

  const [, topLevelPath] = pathname.split('/');
  if (isProjectKeylessApplicationEntryPointInProjectContext(topLevelPath)) {
    return getPreviousProjectKey(defaultProjectKeyOfUser);
  }

  return undefined;
};

export default selectProjectKeyInContext;
