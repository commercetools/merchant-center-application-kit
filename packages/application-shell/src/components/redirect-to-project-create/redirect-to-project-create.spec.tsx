import { mocked } from 'jest-mock';
import { screen, renderApp, waitFor } from '../../test-utils';
import { location } from '../../utils/location';
import RedirectToProjectCreate from './redirect-to-project-create';

jest.mock('../../utils/location');

beforeEach(() => {
  mocked(location.replace).mockClear();
});

describe('given `servedByProxy`', () => {
  it('should redirect to `projects/new`', async () => {
    renderApp(<RedirectToProjectCreate />, {
      environment: {
        servedByProxy: true,
      },
    });
    await waitFor(() => {
      expect(mocked(location.replace)).toHaveBeenCalledWith(
        '/account/projects/new'
      );
    });
  });
});

describe('given not `servedByProxy`', () => {
  it('should not redirect to `projects/new`', async () => {
    renderApp(<RedirectToProjectCreate />);
    await waitFor(() => {
      expect(mocked(location.replace)).not.toHaveBeenCalled();
    });
  });

  it('should show development mode message', async () => {
    renderApp(<RedirectToProjectCreate />);
    await screen.findByText('Please create a project!');
    expect(mocked(location.replace)).not.toHaveBeenCalled();
  });
});
