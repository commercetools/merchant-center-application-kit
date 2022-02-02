import { mocked } from 'jest-mock';
import { screen, renderApp, fireEvent, waitFor } from '../../test-utils';
import { createGraphqlResponseForProjectsQuery } from './project-switcher-test-utils';
import { location } from '../../utils/location';
import ProjectSwitcher from './project-switcher';

jest.mock('../../utils/location');

const render = () => {
  const mockedRequest = [
    createGraphqlResponseForProjectsQuery({
      getIsSuspended: (key) => key === 'key-2',
      getIsExpired: (key) => key === 'key-3',
    }),
  ];
  return renderApp(
    <>
      <label id="project-switcher">{'Project switcher'}</label>
      <ProjectSwitcher projectKey="key-0" />
    </>,
    {
      disableRoutePermissionCheck: true,
      mocks: mockedRequest,
    }
  );
};

describe('rendering', () => {
  beforeEach(() => {
    mocked(location.replace).mockClear();
  });

  it('should search and select a project', async () => {
    render();
    await screen.findByLabelText('Project switcher');
    const input = screen.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'key-1' } });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });

    await waitFor(() => {
      expect(mocked(location.replace)).toHaveBeenCalledWith('/key-1');
    });
  });
  it('should see no results message when search does not match any project', async () => {
    render();
    await screen.findByLabelText('Project switcher');
    const input = screen.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'not existing' } });

    await screen.findByText(
      /Sorry, but there are no projects that match your search/i
    );
  });
  it('should prevent clicking on a suspended project', async () => {
    render();
    await screen.findByLabelText('Project switcher');
    const input = screen.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText(/Suspended/i));

    await waitFor(() =>
      expect(mocked(location.replace)).not.toHaveBeenCalled()
    );
  });
  it('should prevent clicking on an expired project', async () => {
    render();
    await screen.findByLabelText('Project switcher');
    const input = screen.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText(/Expired/i));

    await waitFor(() =>
      expect(mocked(location.replace)).not.toHaveBeenCalled()
    );
  });
});
