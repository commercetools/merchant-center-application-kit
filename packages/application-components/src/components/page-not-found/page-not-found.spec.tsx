import React from 'react';
import { render } from '../../../test-utils';
import PageNotFound from './page-not-found';

describe('rendering', () => {
  it('should render help desk link', () => {
    const rendered = render(<PageNotFound />);
    expect(rendered.queryByText('Help Desk')).toBeInTheDocument();
  });
});
