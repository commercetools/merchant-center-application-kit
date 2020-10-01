import React from 'react';
import { renderAppWithRedux } from '@commercetools-frontend/application-shell/test-utils';
import { ApplicationStarter } from './entry-point';

const render = (options) => {
  return renderAppWithRedux(<ApplicationStarter />, {
    permissions: {
      canViewProducts: true,
    },
    ...options,
  });
};

describe('when route matches', () => {
  it('should render view', async () => {
    const rendered = render({
      route: '/my-project/examples-starter',
    });
    await rendered.findByText(/Page one/i);
  });
});

describe('when route does not match', () => {
  it('should render catch all', async () => {
    const rendered = render({
      route: '/my-project/xyz',
    });
    await rendered.findByText(/we could not find what you are looking for/i);
  });
});

describe('without permissions', () => {
  it('should render `PageUnauthorized`', async () => {
    const rendered = render({
      route: '/my-project/examples-starter',
      permissions: {},
    });
    await rendered.findByText(
      /not enough permissions to access this resource/i
    );
  });
});
