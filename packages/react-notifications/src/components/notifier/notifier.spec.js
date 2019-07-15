/* eslint-disable react/prop-types */
import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  wait,
} from '@testing-library/react';
import { DOMAINS } from '@commercetools-frontend/constants';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import Notifier from './notifier';

jest.mock('@commercetools-frontend/actions-global');

const createTestProps = custom => ({
  domain: DOMAINS.SIDE,
  kind: 'success',
  text: 'foo',
  ...custom,
});

const TestController = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  // This is just to test a rendering of the children
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      <p>{`Count: ${counter}`}</p>
      <button onClick={() => setCounter(counter + 1)}>
        {'Increase counter'}
      </button>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      {isOpen && props.children}
    </div>
  );
};

describe('rendering', () => {
  let rendered;
  let dismiss;
  let showNotification;
  beforeEach(() => {
    dismiss = jest.fn();
    showNotification = jest.fn(() => ({ dismiss }));
    useShowNotification.mockClear();
    useShowNotification.mockReturnValue(showNotification);
  });
  it('should dispatch notification when component renders, then remove the notification when component is removed', async () => {
    rendered = render(
      <TestController>
        <Notifier {...createTestProps()} />
      </TestController>
    );
    await waitForElement(() => rendered.getByText('Open'));
    fireEvent.click(rendered.getByText('Open'));

    await wait(() => {
      expect(showNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          domain: DOMAINS.SIDE,
          kind: 'success',
          text: 'foo',
        }),
        undefined
      );
      expect(dismiss).not.toHaveBeenCalled();
    });

    fireEvent.click(rendered.getByText('Increase counter'));
    fireEvent.click(rendered.getByText('Increase counter'));
    fireEvent.click(rendered.getByText('Increase counter'));
    await waitForElement(() => rendered.getByText('Count: 3'));

    fireEvent.click(rendered.getByText('Close'));
    await wait(() => {
      expect(showNotification).toHaveBeenCalledTimes(1);
      expect(dismiss).toHaveBeenCalled();
    });
  });
});
