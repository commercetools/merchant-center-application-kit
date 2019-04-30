import React from 'react';
import { renderApp } from '../../test-utils';
import RedirectToProjectCreate from './redirect-to-project-create';

describe('given `servedByProxy`', () => {
  beforeEach(() => {
    window.location.replace = jest.fn();
  });
  it('should redirect to `projects/new`', () => {
    renderApp(<RedirectToProjectCreate />, {
      environment: {
        servedByProxy: true,
      },
    });

    expect(window.location.replace).toHaveBeenCalledWith(
      '/account/projects/new'
    );
  });
});

describe('given not `servedByProxy`', () => {
  beforeEach(() => {
    window.location.replace = jest.fn();
  });

  it('should not redirect to `projects/new`', () => {
    renderApp(<RedirectToProjectCreate />);

    expect(window.location.replace).not.toHaveBeenCalled();
  });

  it('should shows development mode message', () => {
    const { getByText } = renderApp(<RedirectToProjectCreate />);

    expect(window.location.replace).not.toHaveBeenCalled();
    expect(getByText('Please create a project!')).toBeInTheDocument();
  });
});
