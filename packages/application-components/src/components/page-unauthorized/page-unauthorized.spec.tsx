import React from 'react';
import { renderComponent } from '../../test-utils';
import PageUnauthorized from './page-unauthorized';

describe('rendering', () => {
  it('should render help desk link', () => {
    const rendered = renderComponent(<PageUnauthorized />);
    expect(rendered.getByText('Help Desk')).toBeInTheDocument();
  });
  it('should render the title', () => {
    const rendered = renderComponent(<PageUnauthorized />);
    expect(
      rendered.getByText('We could not find what you are looking for')
    ).toBeInTheDocument();
  });
});
