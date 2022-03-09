import { warning } from '@commercetools-uikit/utils';
import { screen, renderComponent, fireEvent, waitFor } from '../../test-utils';
import TabHeader from './tab-header';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const renderTabHeader = (additionalProps = {}) =>
  renderComponent(
    <TabHeader to="/tab-one" label="Tab One" {...additionalProps} />
  );

describe('rendering', () => {
  it('should render when "to" is string', () => {
    renderTabHeader();

    expect(screen.getByText(/tab one/i)).toBeInTheDocument();
  });
  it('should render when "to" is of LocationProvider type', () => {
    renderTabHeader({ to: { pathname: '/tab-one' } });

    expect(screen.getByText(/tab one/i)).toBeInTheDocument();
  });
  it('should display a custom intl message instead of a label', () => {
    const intlMessage = { id: 'localized', defaultMessage: 'localized text' };
    renderTabHeader({ intlMessage });
    expect(screen.getByText('localized text')).toBeInTheDocument();
  });
});
describe('navigation', () => {
  it('should navigate to link when clicked', async () => {
    const { history } = renderTabHeader();

    fireEvent.click(screen.getByRole('link', { name: /tab one/i }));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/tab-one');
    });
  });
});
describe('warnings', () => {
  it('should warn when neither "label" nor "intlMessage" is passed', () => {
    renderComponent(<TabHeader to="tab-one" />);

    expect(warning).toHaveBeenCalledWith(
      false,
      'TabHeader: one of either `label` or `intlMessage` is required but their values are `undefined`'
    );
  });
});
