import { mocked } from 'ts-jest/utils';
import React from 'react';
import { renderApp, fireEvent, wait as waitFor } from '../../test-utils';
import BackToProject from './back-to-project';

beforeEach(() => {
  window.location.replace = jest.fn();
});

describe('with `projectKey`', () => {
  it('should redirect to the project with the key', async () => {
    const rendered = renderApp(<BackToProject projectKey="test-project-key" />);
    fireEvent.click(rendered.getByText('Back to project'));
    await waitFor(() => {
      expect(mocked(window.location.replace)).toHaveBeenCalledWith(
        '/test-project-key'
      );
    });
  });
});
describe('without `projectKey`', () => {
  it('should redirect to the root', async () => {
    const rendered = renderApp(<BackToProject />);
    fireEvent.click(rendered.getByText('Back to project'));
    await waitFor(() => {
      expect(mocked(window.location.replace)).toHaveBeenCalledWith('/');
    });
  });
});
