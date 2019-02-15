import React from 'react';
import { Route } from 'react-router';
import { render, waitForElement } from '../../test-utils';
import ProjectSuspended from './project-suspended';

describe('rendering', () => {
  it('when suspension is temporary it should print correct message', async () => {
    const { getByText } = render(
      <Route
        path="/:projectKey"
        render={() => <ProjectSuspended isTemporary={true} />}
      />,
      { route: '/my-project' }
    );
    await waitForElement(() =>
      getByText(/Your Project is temporarily suspended due to maintenance/)
    );
  });
});
