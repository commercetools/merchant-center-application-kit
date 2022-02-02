import type { Props } from './notification';

import { IntlProvider } from 'react-intl';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import Notification from './notification';

const TestComponent = () => <div>{'Test'}</div>;

type CustomDataAttributes = {
  'data-track-component': string;
  'data-track-label': string;
  'data-track-event': string;
  'data-test': string;
};

const createTestProps = (
  props: Partial<Props & CustomDataAttributes> = {}
) => ({
  children: <TestComponent />,
  domain: NOTIFICATION_DOMAINS.SIDE,
  type: NOTIFICATION_KINDS_SIDE.warning,
  onCloseClick: jest.fn(),
  ...props,
});

const renderComponent = (props: ReturnType<typeof createTestProps>) =>
  render(
    <IntlProvider locale="en" messages={{}}>
      <Notification {...props} />
    </IntlProvider>
  );

describe('rendering', () => {
  it('should render children', async () => {
    const props = createTestProps();
    renderComponent(props);
    await screen.findByText('Test');

    fireEvent.click(screen.getByLabelText('Hide notification'));

    await waitFor(() => {
      expect(props.onCloseClick).toHaveBeenCalled();
    });
  });
});
