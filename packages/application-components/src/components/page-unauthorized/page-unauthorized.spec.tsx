import { screen, renderComponent } from '../../test-utils';
import PageUnauthorized from './page-unauthorized';

describe('rendering', () => {
  it('should render help desk link', () => {
    renderComponent(<PageUnauthorized />);

    expect(screen.getByText('Help Desk')).toBeInTheDocument();
  });
  it('should render the title', () => {
    renderComponent(<PageUnauthorized />);

    expect(
      screen.getByText('We could not find what you are looking for')
    ).toBeInTheDocument();
  });
});
