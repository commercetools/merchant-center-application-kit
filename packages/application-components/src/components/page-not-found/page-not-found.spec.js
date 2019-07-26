import React from 'react';
import { render } from '../../../test-utils';
import PageNotFound from './page-not-found';

describe('rendering', () => {
  it('should render help desk link', () => {
    const { getByText } = render(<PageNotFound />);
    expect(getByText('Help Desk')).toBeInTheDocument();
  });
});
