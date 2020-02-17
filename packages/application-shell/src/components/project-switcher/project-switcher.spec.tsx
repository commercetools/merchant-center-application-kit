import { mocked } from 'ts-jest/utils';
import React from 'react';
import { renderApp, fireEvent, waitForElement, wait } from '../../test-utils';
import { createGraphqlResponseForProjectsQuery } from './project-switcher-test-utils';
import ProjectSwitcher from './project-switcher';

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
    window.location.replace = jest.fn();
  });
  it('should search and select a project', async () => {
    const rendered = render();
    await waitForElement(() => rendered.getByLabelText('Project switcher'));
    const input = rendered.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'key-1' } });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });

    await wait(() => {
      expect(mocked(window.location.replace)).toHaveBeenCalledWith('/key-1');
    });
  });
  it('should see no results message when search does not match any project', async () => {
    const rendered = render();
    await waitForElement(() => rendered.getByLabelText('Project switcher'));
    const input = rendered.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'not existing' } });

    await waitForElement(() =>
      rendered.getByText(
        /Sorry, but there are no projects that match your search/i
      )
    );
  });
  it('should prevent clicking on a suspended project', async () => {
    const rendered = render();
    await waitForElement(() => rendered.getByLabelText('Project switcher'));
    const input = rendered.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.click(rendered.getByText(/Suspended/i));

    await wait(() =>
      expect(mocked(window.location.replace)).not.toHaveBeenCalled()
    );
  });
  it('should prevent clicking on an expired project', async () => {
    const rendered = render();
    await waitForElement(() => rendered.getByLabelText('Project switcher'));
    const input = rendered.getByLabelText('Project switcher');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.click(rendered.getByText(/Expired/i));

    await wait(() =>
      expect(mocked(window.location.replace)).not.toHaveBeenCalled()
    );
  });
});
