import type {
  TAddNotificationAction,
  TNotification,
} from '@commercetools-frontend/notifications';
import type { TShowNotification } from '@commercetools-frontend/actions-global';

import { mocked } from 'jest-mock';
import { useState, ReactNode } from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { ADD_NOTIFICATION } from '@commercetools-frontend/notifications';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import Notifier from './notifier';

jest.mock('@commercetools-frontend/actions-global');

type TextControllerProps = {
  children: ReactNode;
};
const TestController = (props: TextControllerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // This is just to test a rendering of the children
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>{`Count: ${counter}`}</p>
      <button onClick={() => setCounter(counter + 1)}>
        {'Increase counter'}
      </button>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      {/* eslint-disable-next-line testing-library/no-node-access */}
      {isOpen && props.children}
    </div>
  );
};

describe('rendering', () => {
  let dismiss: () => void;
  let showNotification: (
    notification: TShowNotification
  ) => TAddNotificationAction<TShowNotification & TNotification>;
  beforeEach(() => {
    dismiss = jest.fn();
    showNotification = jest.fn(() => ({
      type: ADD_NOTIFICATION,
      payload: { id: 1, domain: 'side', kind: 'success' },
      dismiss,
    }));
    mocked(useShowNotification).mockClear();
    mocked(useShowNotification).mockReturnValue(showNotification);
  });
  it('should dispatch notification when component renders, then remove the notification when component is removed', async () => {
    render(
      <TestController>
        <Notifier
          domain={NOTIFICATION_DOMAINS.SIDE}
          kind="success"
          text="foo"
        />
      </TestController>
    );
    await screen.findByText('Open');
    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(showNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          domain: NOTIFICATION_DOMAINS.SIDE,
          kind: NOTIFICATION_KINDS_SIDE.success,
          text: 'foo',
        }),
        undefined
      );
    });
    expect(dismiss).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Increase counter'));
    fireEvent.click(screen.getByText('Increase counter'));
    fireEvent.click(screen.getByText('Increase counter'));
    await screen.findByText('Count: 3');

    fireEvent.click(screen.getByText('Close'));
    await waitFor(() => {
      expect(showNotification).toHaveBeenCalledTimes(1);
    });
    expect(dismiss).toHaveBeenCalled();
  });
});
