import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { warning } from '@commercetools-uikit/utils';
import {
  screen,
  renderComponent,
  fireEvent,
  waitFor,
} from '../../../test-utils';
import TabHeader from '../../tab-header/tab-header';
import TabularDetailPage from './tabular-detail-page';

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

const renderTabularDetailPage = (additionalProps = {}) =>
  renderComponent(
    <TabularDetailPage
      tabControls={
        <>
          <TabHeader to="/tab-one" label="Tab One" />
          <TabHeader to="/tab-two" label="Tab Two" />
          <TabHeader to="/tab-three" label="Disabled tab" isDisabled />
        </>
      }
      onPreviousPathClick={() => {}}
      {...additionalProps}
    >
      <Content />
    </TabularDetailPage>
  );

const TabularDetailPageWithHistory = (additionalProps = {}) => {
  const history = useHistory();
  return (
    <TabularDetailPage
      title="Test page"
      subtitle="Subtitle"
      tabControls={
        <>
          <TabHeader to="/tab-one" label="Tab One" />
          <TabHeader to="/tab-two" label="Tab Two" />
          <TabHeader to="/tab-three" label="Disabled tab" isDisabled />
        </>
      }
      onPreviousPathClick={() => history.push('/start')}
      {...additionalProps}
    >
      <Content />
    </TabularDetailPage>
  );
};

describe('rendering', () => {
  it('should render "tab one" as active by default and the content that it leads to', () => {
    renderTabularDetailPage({ title: 'Test page' });

    screen.getByText(/curabitur nec turpis in risus elementum fringilla/i);
  });
  it('should render custom title row', () => {
    const customTitleRow = <div>Custom</div>;
    renderTabularDetailPage({ customTitleRow });

    screen.getByText(/custom/i);
  });
  it('should warn if no title nor custom title row are provided', () => {
    renderTabularDetailPage();

    expect(warning).toHaveBeenCalledWith(
      false,
      'TabularDetailPage: one of either `title` or `customTitleRow` is required but both their values are `undefined`'
    );
  });
});
describe('navigation', () => {
  it('should navigate to the other tab when clicked and show content that it leads to', async () => {
    const { history } = renderTabularDetailPage({ title: 'Test page' });

    fireEvent.click(screen.getByRole('tab', { name: /tab two/i }));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/tab-two');
      screen.getByText(/nam id orci ut risus accumsan pellentesque/i);
    });
  });
  it('should navigate to link on back button click', async () => {
    const { history } = renderComponent(<TabularDetailPageWithHistory />);

    fireEvent.click(screen.getByRole('button', { name: /go back/i }));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/start');
    });
  });
});
