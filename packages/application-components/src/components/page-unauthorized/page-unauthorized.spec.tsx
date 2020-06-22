import React from 'react';
import { renderComponent } from '../../test-utils';
import PageUnauthorized from './page-unauthorized';

describe('rendering', () => {
  it('should render help desk link', () => {
    const rendered = renderComponent(<PageUnauthorized />);
    expect(rendered.getByText('Help Desk')).toBeInTheDocument();
  });
});
