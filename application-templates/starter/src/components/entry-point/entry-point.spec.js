import { screen } from '@testing-library/react';
import { renderApplicationWithRedux } from '../../test-utils';

const render = (options) => {
  return renderApplicationWithRedux(null, {
    permissions: {
      canViewProducts: true,
    },
    ...options,
  });
};

describe('when route matches', () => {
  it('should render view', async () => {
    render({
      route: '/my-project/examples-starter',
    });
    await screen.findByText(/Page one/i);
  });
});

describe('when route does not match', () => {
  it('should render catch all', async () => {
    render({
      route: '/my-project/xyz',
    });
    await screen.findByText(/we could not find what you are looking for/i);
  });
});

describe('without permissions', () => {
  it('should render `PageUnauthorized`', async () => {
    render({
      route: '/my-project/examples-starter',
      permissions: {},
    });
    await screen.findByText(/not enough permissions to access this resource/i);
  });
});
