import React from 'react';
import { render, wait } from '@testing-library/react';
import ApplicationLoader from './application-loader';

describe('rendering', () => {
  let rendered;
  describe('when "showLogo" is "true"', () => {
    beforeEach(() => {
      rendered = render(<ApplicationLoader showLogo={true} />);
    });
    it('should render the commercetools logo', () => {
      expect(rendered.queryByAltText('commercetools logo')).toBeInTheDocument();
    });
  });
  describe('when "showLogo" is "false"', () => {
    beforeEach(() => {
      rendered = render(<ApplicationLoader />);
    });
    it('should render the commercetools logo', async () => {
      await wait(
        () => {
          expect(
            rendered.queryByAltText('commercetools logo')
          ).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });
});
