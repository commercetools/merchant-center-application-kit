import React from 'react';
import { renderApp, fireEvent } from '../../../test-utils';
import BackToProject from './back-to-project';

describe('with `projectKey`', () => {
  beforeEach(() => {
    window.location.replace = jest.fn();
    const { getByText } = renderApp(
      <BackToProject projectKey="test-project-key" />
    );

    fireEvent.click(getByText('Back to project'));
  });

  it('should redirect to the project with the key', () => {
    expect(window.location.replace).toHaveBeenCalledWith('/test-project-key');
  });
});
describe('without `projectKey`', () => {
  beforeEach(() => {
    window.location.replace = jest.fn();
    const { getByText } = renderApp(<BackToProject />);

    fireEvent.click(getByText('Back to project'));
  });

  it('should redirect to the root', () => {
    expect(window.location.replace).toHaveBeenCalledWith('/');
  });
});
