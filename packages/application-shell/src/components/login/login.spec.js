import React from 'react';
// import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { renderWithRedux, waitForElement, fireEvent } from '../../test-utils';
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

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

/* New tests with react-testing-library */
describe('reset password flow', () => {
  beforeEach(() => {
    window.location.replace = jest.fn();
  });
  it('should open a dialog and redirect to the AC', async () => {
    const props = createTestProps();
    const { getByText } = renderWithRedux(<Login {...props} />, {
      environment: { adminCenterUrl: 'http://ac.com' },
    });

    await waitForElement(() => getByText(/Sign in to your account/));

    fireEvent.click(getByText(/Forgot password/));

    await waitForElement(() =>
      getByText(
        /We are redirecting you to the Forgot Password form in 3 seconds/
      )
    );

    await delay(4000); // the countdown is 3 secods, we wait a bit more just to be sure

    expect(window.location.replace).toHaveBeenCalledWith(
      'http://ac.com/reset-password'
    );
  });
});
