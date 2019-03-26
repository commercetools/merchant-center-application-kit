import React from 'react';
// import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import {
  renderAppWithRedux,
  wait,
  waitForElement,
  fireEvent,
} from '../../test-utils';
import Login from './login';

jest.mock('@commercetools-frontend/storage');

const createTestProps = props => ({
  location: { query: {} },
  history: {
    push: jest.fn(),
  },
  ...props,
});

// TODO: write new tests for the login interaction

describe('reset password flow', () => {
  beforeEach(() => {
    window.location.replace = jest.fn();
  });
  it('should open a dialog and redirect to the AC', async () => {
    const props = createTestProps();
    const { getByText } = renderAppWithRedux(<Login {...props} />, {
      environment: { adminCenterUrl: 'http://ac.com' },
    });

    await waitForElement(() => getByText(/Sign in to your account/));

    fireEvent.click(getByText(/Forgot password/));

    await waitForElement(() =>
      getByText(
        /We are redirecting you to the Forgot Password form in 3 seconds/
      )
    );

    await wait(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        'http://ac.com/reset-password'
      );
    });
  });
});
