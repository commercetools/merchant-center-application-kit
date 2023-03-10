import { mocked } from 'jest-mock';
import { ReactElement } from 'react';
import type { RenderResult } from '@testing-library/react';

import { screen, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_PAGE,
  NOTIFICATION_KINDS_GLOBAL,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import NotificationProviderForCustomComponent from '../map-notification-to-component';
import NotificationsList from './notifications-list';

const CustomComponent = () => <div>{'Custom component'}</div>;
CustomComponent.displayName = 'CustomComponent';

jest.mock('react-redux');

const mapNotificationToComponent = () => CustomComponent;

const renderComponent = (ui: ReactElement): RenderResult =>
  render(
    <IntlProvider locale="en" messages={{}}>
      {ui}
    </IntlProvider>
  );

describe('rendering', () => {
  beforeEach(() => {
    mocked(useSelector).mockClear();
    mocked(useSelector).mockReturnValue([]);
  });
  describe('if there is a custom notification component', () => {
    beforeEach(() => {
      mocked(useSelector).mockClear();
      mocked(useSelector).mockReturnValue([
        {
          id: 1,
          domain: NOTIFICATION_DOMAINS.PAGE,
          kind: NOTIFICATION_KINDS_PAGE.error,
          text: 'Something went wrong',
        },
      ]);
    });
    it('should render the <CustomComponent> notification component', async () => {
      renderComponent(
        <NotificationProviderForCustomComponent
          mapNotificationToComponent={mapNotificationToComponent}
        >
          <NotificationsList domain={NOTIFICATION_DOMAINS.PAGE} />
        </NotificationProviderForCustomComponent>
      );
      await screen.findByText('Custom component');
    });
  });
  describe('for domain: page', () => {
    describe('for kind: error', () => {
      beforeEach(() => {
        mocked(useSelector).mockClear();
        mocked(useSelector).mockReturnValue([
          {
            id: 1,
            domain: NOTIFICATION_DOMAINS.PAGE,
            kind: NOTIFICATION_KINDS_PAGE.error,
            text: 'Something went wrong',
          },
        ]);
      });
      it('should render the GenericNotification notification component', async () => {
        renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.PAGE} />
        );
        await screen.findByText('Something went wrong');
      });
    });
    describe('for kind: api-error', () => {
      beforeEach(() => {
        mocked(useSelector).mockClear();
        mocked(useSelector).mockReturnValue([
          {
            id: 1,
            domain: NOTIFICATION_DOMAINS.PAGE,
            kind: NOTIFICATION_KINDS_PAGE['api-error'],
            values: {
              errors: [
                {
                  extensions: {
                    code: 'ConcurrentModification',
                  },
                  message: 'Concurrent modification',
                },
              ],
            },
          },
        ]);
      });
      it('should render the ApiErrorNotification notification component', async () => {
        renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.PAGE} />
        );
        await screen.findByText(
          /we were unable to save your changes as someone else made changes to this same source while you were editing/
        );
      });
    });
    describe('for kind: unexpected-error', () => {
      beforeEach(() => {
        console.error = jest.fn();
        mocked(useSelector).mockClear();
        mocked(useSelector).mockReturnValue([
          {
            id: 1,
            domain: NOTIFICATION_DOMAINS.PAGE,
            kind: NOTIFICATION_KINDS_PAGE['unexpected-error'],
            values: {},
          },
        ]);
      });
      it('should render the UnexpectedErrorNotification notification component', async () => {
        renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.PAGE} />
        );
        await screen.findByText(/Sorry, but there seems to be something wrong/);
      });
    });
  });
  describe('for domain: global', () => {
    describe('for kind: error', () => {
      beforeEach(() => {
        mocked(useSelector).mockClear();
        mocked(useSelector).mockReturnValue([
          {
            id: 1,
            domain: NOTIFICATION_DOMAINS.GLOBAL,
            kind: NOTIFICATION_KINDS_GLOBAL.error,
            text: 'Something went wrong',
          },
        ]);
      });
      it('should render the GenericNotification notification component', async () => {
        renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.GLOBAL} />
        );
        await screen.findByText('Something went wrong');
      });
    });
    describe('for kind: unexpected-error', () => {
      beforeEach(() => {
        mocked(useSelector).mockClear();
        mocked(useSelector).mockReturnValue([
          {
            id: 1,
            domain: NOTIFICATION_DOMAINS.GLOBAL,
            kind: NOTIFICATION_KINDS_GLOBAL['unexpected-error'],
            values: {},
          },
        ]);
      });
      it('should render the UnexpectedErrorNotification notification component', async () => {
        renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.GLOBAL} />
        );
        await screen.findByText(/Sorry, but there seems to be something wrong/);
      });
    });
  });
  describe('for domain: side', () => {
    describe('for kind: error', () => {
      beforeEach(() => {
        mocked(useSelector).mockClear();
        mocked(useSelector).mockReturnValue([
          {
            id: 1,
            domain: NOTIFICATION_DOMAINS.SIDE,
            kind: NOTIFICATION_KINDS_SIDE.error,
            text: 'Something went wrong',
          },
        ]);
      });
      it('should render the GenericNotification notification component', async () => {
        renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.SIDE} />
        );
        await screen.findByText('Something went wrong');
      });
    });
  });
});
