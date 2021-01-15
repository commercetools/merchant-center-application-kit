import React from 'react';
import { renderComponent, screen } from '../../test-utils';
import PublicPageLayout from './public-page-layout';

describe('rendering', () => {
  it('should render welcome message and footer', async () => {
    renderComponent(
      <PublicPageLayout welcomeMessage="Welcome to the Merchant Center">
        {'Test'}
      </PublicPageLayout>
    );
    await screen.findByText('Welcome to the Merchant Center');
    await screen.findByText(/commercetools/);
  });
});
