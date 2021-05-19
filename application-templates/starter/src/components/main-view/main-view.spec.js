import { fireEvent } from '@commercetools-frontend/application-shell/test-utils';
import { screen } from '@testing-library/react';
import { renderApplication } from '../../test-utils';

describe('main view', () => {
  it('the user can click on the link to "one" and the page should show a text with "View one"', async () => {
    const initialRoute = '/my-project/examples-starter';
    const { history } = renderApplication(null, {
      permissions: { canViewProducts: true, canManageProducts: true },
      route: initialRoute,
    });

    await screen.findByText(/Hello, world/i);

    fireEvent.click(screen.getByText(/Page one/i));

    await screen.findByText(/View one/i);

    expect(history.location).toEqual(
      expect.objectContaining({
        pathname: `${initialRoute}/one`,
      })
    );
  });
});
