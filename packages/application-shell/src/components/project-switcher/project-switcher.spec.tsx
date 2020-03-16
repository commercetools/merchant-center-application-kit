import { mocked } from 'ts-jest/utils';
import React from 'react';
import { renderApp, fireEvent, wait as waitFor } from '../../test-utils';
import { createGraphqlResponseForProjectsQuery } from './project-switcher-test-utils';
import { location } from '../../utils/location';
import ProjectSwitcher from './project-switcher';

jest.mock('../../utils/location');

const render = () => {
  const mockedRequest = [
    createGraphqlResponseForProjectsQuery({
      getIsSuspended: key => key === 'key-2',
      getIsExpired: key => key === 'key-3',
    }),
  ];
  return renderApp(
    <>
      <label id="project-switcher">{'Project switcher'}</label>
      <ProjectSwitcher projectKey="key-0" />
    </>,
    {
      addTypename: true,
      mocks: mockedRequest,
    }
  );
};

describe('rendering', () => {
  beforeEach(() => {
    mocked(location.replace).mockClear();
  });

  it('should search and select a project', async () => {
    const rendered = render();
    await rendered.findByLabelText('Project switcher');
    const input = rendered.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'key-1' } });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });

    await waitFor(() => {
      expect(mocked(location.replace)).toHaveBeenCalledWith('/key-1');
    });
  });
  it('should see no results message when search does not match any project', async () => {
    const rendered = render();
    await rendered.findByLabelText('Project switcher');
    const input = rendered.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'not existing' } });

    await rendered.findByText(
      /Sorry, but there are no projects that match your search/i
    );
  });
  it('should prevent clicking on a suspended project', async () => {
    const rendered = render();
    await rendered.findByLabelText('Project switcher');
    const input = rendered.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.click(rendered.getByText(/Suspended/i));

    await waitFor(() =>
      expect(mocked(location.replace)).not.toHaveBeenCalled()
    );
  });
  it('should prevent clicking on an expired project', async () => {
    const rendered = render();
    await rendered.findByLabelText('Project switcher');
    const input = rendered.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.click(rendered.getByText(/Expired/i));

    await waitFor(() =>
      expect(mocked(location.replace)).not.toHaveBeenCalled()
    );
  });
});
