import { mocked } from 'jest-mock';
import {
  screen,
  renderApp,
  fireEvent,
  waitFor,
  within,
} from '../../test-utils';
import { location } from '../../utils/location';
import ProjectSwitcher from './project-switcher';
import { createGraphqlResponseForProjectsQuery } from './project-switcher-test-utils';

jest.mock('../../utils/location');

const render = () => {
  const mockedRequest = [
    createGraphqlResponseForProjectsQuery({
      getIsProduction: (key) => key === 'key-1',
      getIsSuspended: (key) => key === 'key-2',
      getIsExpired: (key) => key === 'key-3',
    }),
  ];
  return renderApp(<ProjectSwitcher projectKey="key-0" />, {
    disableRoutePermissionCheck: true,
    mocks: mockedRequest,
  });
};

describe('rendering', () => {
  beforeEach(() => {
    mocked(location.replace).mockClear();
  });

  it('should search and select a project', async () => {
    render();
    const input = await screen.findByLabelText('Projects');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'key-1' } });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });

    await waitFor(() => {
      expect(mocked(location.replace)).toHaveBeenCalledWith('/key-1');
    });
  });
  it('should see no results message when search does not match any project', async () => {
    render();
    const input = await screen.findByLabelText('Projects');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'not existing' } });

    await screen.findByText(
      /Sorry, but there are no projects that match your search/i
    );
  });
  it('should prevent clicking on a suspended project', async () => {
    render();
    const input = await screen.findByLabelText('Projects');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText(/Suspended/i));

    await waitFor(() =>
      expect(mocked(location.replace)).not.toHaveBeenCalled()
    );
  });
  it('should prevent clicking on an expired project', async () => {
    render();
    const input = await screen.findByLabelText('Projects');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText(/Expired/i));

    await waitFor(() =>
      expect(mocked(location.replace)).not.toHaveBeenCalled()
    );
  });
  it('should render the expected stamps for each project', async () => {
    render();
    const input = await screen.findByLabelText('Projects');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const options = await screen.findAllByRole('option');

    // Define the expected text for each index
    const expectedTexts = [null, 'Production', 'Suspended', 'Trial expired'];

    function verifyStamp(option: HTMLElement, expectedText: string | null) {
      const stamp = within(option).queryByText(
        /Production|Suspended|Trial expired/i
      );

      // Check if the stamp exists
      const stampExists = stamp !== null;

      // First option should not have a stamp
      expect(stampExists).toBe(expectedText !== null);

      // Check that the stamp's text content matches the expected text
      expect(stamp && stamp.textContent).toEqual(expectedText);
    }

    options.forEach((option, index) => {
      verifyStamp(option, expectedTexts[index]);
    });
  });
});
