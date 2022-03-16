import { Switch, Route, Redirect } from 'react-router-dom';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { warning } from '@commercetools-uikit/utils';
import { screen, renderComponent, fireEvent, waitFor } from '../../test-utils';
import TabHeader from '../tab-header/tab-header';
import TabularMainPage from './tabular-main-page';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const Content = () => (
  <Spacings.Stack scale="m">
    <Switch>
      <Route exact={true} path="/">
        <Redirect to="/tab-one" />
      </Route>
      <Route path="/tab-one">
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
      </Route>
      <Route path="/tab-two">
        <Text.Body>
          {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
        </Text.Body>
      </Route>
    </Switch>
  </Spacings.Stack>
);

const renderTabularMainPage = (additionalProps = {}) =>
  renderComponent(
    <TabularMainPage
      tabControls={
        <>
          <TabHeader to="/tab-one" label="Tab One" />
          <TabHeader to="/tab-two" label="Tab Two" />
          <TabHeader to="/tab-three" label="Disabled tab" isDisabled />
        </>
      }
      {...additionalProps}
    >
      <Content />
    </TabularMainPage>
  );

describe('rendering', () => {
  it('should render "tab one" as active by default and the content that it leads to', () => {
    renderTabularMainPage({ title: 'Title' });

    screen.getByText(/curabitur nec turpis in risus elementum fringilla/i);
  });
  it('should render title passed as "intl" message', () => {
    const titleIntlMessage = {
      id: 'localized',
      defaultMessage: 'localized text',
    };
    renderTabularMainPage({ titleIntlMessage });

    screen.getByText(/localized text/i);
  });
  it('should render custom title row', () => {
    const customTitleRow = <div>Custom</div>;
    renderTabularMainPage({ customTitleRow });

    screen.getByText(/custom/i);
  });
});
describe('navigation', () => {
  it('should navigate to the other tab when clicked and show content that it leads to', async () => {
    const { history } = renderTabularMainPage({ title: 'Title' });

    fireEvent.click(screen.getByRole('tab', { name: /tab two/i }));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/tab-two');
      screen.getByText(/nam id orci ut risus accumsan pellentesque/i);
    });
  });
});
describe('warnings', () => {
  it('should warn when neither "title", "titleIntlMessage" nor "customTitleRow" is passed', () => {
    renderTabularMainPage();

    expect(warning).toHaveBeenCalledWith(
      false,
      'TabularMainPage: one of either `title`, `titleIntlMessage` or `customTitleRow` is required but their values are `undefined`'
    );
  });
});
