import { screen, render } from '@testing-library/react';
import ApplicationLoader from './application-loader';

describe('rendering', () => {
  describe('when "showLogo" is "true"', () => {
    it('should render the commercetools logo', () => {
      render(<ApplicationLoader showLogo={true} />);

      expect(screen.getByAltText('commercetools logo')).toBeInTheDocument();
    });
  });
  describe('when "showLogo" is "false"', () => {
    it('should not render the commercetools logo', async () => {
      render(<ApplicationLoader />);

      expect(
        screen.queryByAltText('commercetools logo')
      ).not.toBeInTheDocument();
    });
  });
});
