import {
  renderAppWithRedux,
  screen,
} from '@commercetools-frontend/application-shell/test-utils';

describe('rendering', () => {
  it('should render the authenticated users first name', async () => {
    renderAppWithRedux(<FirstName />, {
      user: {
        firstName: 'Leonard',
      },
    });
    await screen.findByText('First name: Leonard');
  });
});
