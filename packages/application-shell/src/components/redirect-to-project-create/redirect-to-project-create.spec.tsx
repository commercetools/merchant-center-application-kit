import { mocked } from 'ts-jest/utils';
import React from 'react';
import { renderApp, wait as waitFor } from '../../test-utils';
import RedirectToProjectCreate from './redirect-to-project-create';

beforeEach(() => {
  window.location.replace = jest.fn();
});

describe('given `servedByProxy`', () => {
  it('should redirect to `projects/new`', async () => {
    renderApp(<RedirectToProjectCreate />, {
      environment: {
        servedByProxy: true,
      },
    });
    await waitFor(() => {
      expect(mocked(window.location.replace)).toHaveBeenCalledWith(
        '/account/projects/new'
      );
    });
  });
});

describe('given not `servedByProxy`', () => {
  it('should not redirect to `projects/new`', async () => {
    renderApp(<RedirectToProjectCreate />);
    await waitFor(() => {
      expect(mocked(window.location.replace)).not.toHaveBeenCalled();
    });
  });

  it('should show development mode message', async () => {
    const rendered = renderApp(<RedirectToProjectCreate />);
    await rendered.findByText('Please create a project!');
    expect(mocked(window.location.replace)).not.toHaveBeenCalled();
  });
});
