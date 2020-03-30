import React from 'react';
import { renderComponent } from '../../test-utils';
import PageNotFound from './page-not-found';

describe('rendering', () => {
  it('should render help desk link', () => {
    const rendered = renderComponent(<PageNotFound />);
    expect(rendered.getByText('Help Desk')).toBeInTheDocument();
  });
});
