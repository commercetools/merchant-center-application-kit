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

    screen.getByText(/tab one/i);
  });
  it('should render when "to" is of LocationProvider type', () => {
    renderTabHeader({ to: { pathname: '/tab-one' } });

    screen.getByText(/tab one/i);
  });
  it('should display a custom intl message', () => {
    const intlMessage = { id: 'localized', defaultMessage: 'localized text' };
    renderComponent(<TabHeader to="/tab-one" intlMessage={intlMessage} />);
    screen.getByText('localized text');
  });
  it('should display a custom intl message instead of a label when both are passed', () => {
    const intlMessage = { id: 'localized', defaultMessage: 'localized text' };
    renderTabHeader({ intlMessage }); // mind that both `intlMessage` and `label` are passed
    screen.getByText('localized text');
  });
});
describe('navigation', () => {
  it('should navigate to link when clicked', async () => {
    const { history } = renderTabHeader();

    fireEvent.click(screen.getByRole('tab', { name: /tab one/i }));
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
