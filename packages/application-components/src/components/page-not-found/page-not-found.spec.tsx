import React from 'react';
import { screen, renderComponent } from '../../test-utils';
import PageNotFound from './page-not-found';

describe('rendering', () => {
  it('should render help desk link', () => {
    renderComponent(<PageNotFound />);

    expect(screen.getByText('Help Desk')).toBeInTheDocument();
  });
});
