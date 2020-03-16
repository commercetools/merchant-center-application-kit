import React from 'react';
import {
  renderApp,
  fireEvent,
} from '@commercetools-frontend/application-shell/test-utils';
import { ApplicationStarter } from '../entry-point';

describe('main view', () => {
  it('the user can click on the link to "one" and the page should show a text with "View one"', async () => {
    const initialRoute = '/my-project/examples-starter';
    const rendered = renderApp(<ApplicationStarter />, {
      permissions: { canViewProducts: true, canManageProducts: true },
      route: initialRoute,
    });
    await rendered.findByText(/Hello, world/i);

    fireEvent.click(rendered.getByText(/Page one/i));

    await rendered.findByText(/View one/i);

    expect(rendered.history.location).toEqual(
      expect.objectContaining({
        pathname: `${initialRoute}/one`,
      })
    );
  });
});
