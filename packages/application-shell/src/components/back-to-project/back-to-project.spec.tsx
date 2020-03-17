import { mocked } from 'ts-jest/utils';
import React from 'react';
import { renderApp, fireEvent, waitFor } from '../../test-utils';
import { location } from '../../utils/location';
import BackToProject from './back-to-project';

jest.mock('../../utils/location');

describe('with `projectKey`', () => {
  it('should redirect to the project with the key', async () => {
    const rendered = renderApp(<BackToProject projectKey="test-project-key" />);
    fireEvent.click(rendered.getByText('Back to project'));
    await waitFor(() => {
      expect(mocked(location.replace)).toHaveBeenCalledWith(
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
      expect(mocked(location.replace)).toHaveBeenCalledWith('/');
    });
  });
});
