import React from 'react';
import { Redirect } from 'react-router-dom';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import FetchUser from '../fetch-user';

const RedirectToProject = () => (
  <FetchUser>
    {({ isLoading, user }) => {
      if (!isLoading && user && user.availableProjects.length > 0) {
        const cachedProject = storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
        const projectKey = cachedProject || user.availableProjects[0].key;
        // Redirect to an active project key, or the
        // first one in the list of available projects
        return <Redirect to={`/${projectKey}`} />;
      }
      return null;
    }}
  </FetchUser>
);
RedirectToProject.displayName = 'RedirectToProject';

export default RedirectToProject;
