import React from 'react';
import { render } from '@commercetools-frontend/application-shell/test-utils';
import PageNotFound from './page-not-found';
import messages from './messages';

describe('rendering', () => {
  it('should render help desk link', () => {
    const { getByText } = render(<PageNotFound />);
    expect(getByText(messages.helpDesk.defaultMessage)).toBeInTheDocument();
  });
});
