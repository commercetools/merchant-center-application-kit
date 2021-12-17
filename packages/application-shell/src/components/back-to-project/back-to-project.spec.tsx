import { mocked } from 'jest-mock';
import { screen, renderApp, fireEvent, waitFor } from '../../test-utils';
import { location } from '../../utils/location';
import BackToProject from './back-to-project';

jest.mock('../../utils/location');

describe('with `projectKey`', () => {
  it('should redirect to the project with the key', async () => {
    renderApp(<BackToProject projectKey="test-project-key" />);
    fireEvent.click(screen.getByText('Back to project'));
    await waitFor(() => {
      expect(mocked(location.replace)).toHaveBeenCalledWith(
        '/test-project-key'
      );
    });
  });
});
describe('without `projectKey`', () => {
  it('should redirect to the root', async () => {
    renderApp(<BackToProject />);
    fireEvent.click(screen.getByText('Back to project'));
    await waitFor(() => {
      expect(mocked(location.replace)).toHaveBeenCalledWith('/');
    });
  });
});
