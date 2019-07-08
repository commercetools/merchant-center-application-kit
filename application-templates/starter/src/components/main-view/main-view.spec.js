import React from 'react';
import {
  renderApp,
  waitForElement,
  fireEvent,
} from '@commercetools-frontend/application-shell/test-utils';
import { ApplicationStarter } from '../entry-point';

describe('main view', () => {
  it('the user can click on the link to "one" and the page should show a text with "View one"', async () => {
    const initialRoute = '/my-project/examples-starter';
    const { getByText, history } = renderApp(<ApplicationStarter />, {
      permissions: { canViewProducts: true, canManageProducts: true },
      route: initialRoute,
    });
    await waitForElement(() => getByText(/Hello, world/i));

    fireEvent.click(getByText(/Page one/i));

    await waitForElement(() => getByText(/View one/i));

    expect(history.location).toEqual(
      expect.objectContaining({
        pathname: `${initialRoute}/one`,
      })
    );
  });
});
