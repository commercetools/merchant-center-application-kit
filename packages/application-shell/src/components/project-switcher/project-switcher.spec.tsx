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
      getIsProduction: (key) => key === 'key-1' || key === 'key-3',
      getIsSuspended: (key) => key === 'key-2' || key === 'key-3',
      getIsExpired: (key) => key === 'key-3',
    }),
  ];
  return renderApp(<ProjectSwitcher projectKey="key-0" />, {
    disableRoutePermissionCheck: true,
    mocks: mockedRequest,
  });
};

function verifyProjectOptionStamps(
  projectOption: HTMLElement,
  expectedText: string[] | null[]
) {
  const stamps = within(projectOption).queryAllByText(
    /Production|Suspended|Trial expired/i
  );

  stamps.forEach((stamp, index) => {
    expect(stamp.textContent).toEqual(expectedText[index]);
  });
}

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
    fireEvent.click((await screen.findAllByText(/Suspended/i))[0]);

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

    const swticherProjectsOptions = await screen.findAllByRole('option');

    // We define which stamps are expected for each switcher option
    // The stamps are ordered so we can also verified they're rendered in the correct order
    const expectedOrderedStamps = [
      [null], // First option has no stamps
      ['Production'], // Second option has only one "Production" stamp
      ['Suspended'], // Third option has only one "Suspended" stamp
      ['Production', 'Suspended', 'Trial expired'], // Fourth option has all three stamps
    ];

    swticherProjectsOptions.forEach((projectOption, index) => {
      verifyProjectOptionStamps(projectOption, expectedOrderedStamps[index]);
    });
  });
});
