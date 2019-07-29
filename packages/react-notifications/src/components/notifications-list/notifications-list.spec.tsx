import { mocked } from 'ts-jest/utils';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { render, waitForElement, RenderResult } from '@testing-library/react';
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

const renderComponent = (ui: React.ReactElement): RenderResult =>
  render(
    <IntlProvider locale="en" messages={{}}>
      {ui}
    </IntlProvider>
  );

describe('rendering', () => {
  let rendered: RenderResult;
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
      rendered = renderComponent(
        <NotificationProviderForCustomComponent
          mapNotificationToComponent={mapNotificationToComponent}
        >
          <NotificationsList domain={NOTIFICATION_DOMAINS.PAGE} />
        </NotificationProviderForCustomComponent>
      );
    });
    it('should render the <CustomComponent> notification component', async () => {
      await waitForElement(() => rendered.getByText('Custom component'));
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
        rendered = renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.PAGE} />
        );
      });
      it('should render the GenericNotification notification component', async () => {
        await waitForElement(() => rendered.getByText('Something went wrong'));
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
                  code: 'ConcurrentModification',
                  message: 'Concurrent modification',
                },
              ],
            },
          },
        ]);
        rendered = renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.PAGE} />
        );
      });
      it('should render the ApiErrorNotification notification component', async () => {
        await waitForElement(() =>
          rendered.getByText(
            /we were unable to save your changes as someone else made changes to this same resource while you were editing/
          )
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
        rendered = renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.PAGE} />
        );
      });
      it('should render the UnexpectedErrorNotification notification component', async () => {
        await waitForElement(() =>
          rendered.getByText(/Sorry, but there seems to be something wrong/)
        );
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
        rendered = renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.GLOBAL} />
        );
      });
      it('should render the GenericNotification notification component', async () => {
        await waitForElement(() => rendered.getByText('Something went wrong'));
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
        rendered = renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.GLOBAL} />
        );
      });
      it('should render the UnexpectedErrorNotification notification component', async () => {
        await waitForElement(() =>
          rendered.getByText(/Sorry, but there seems to be something wrong/)
        );
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
        rendered = renderComponent(
          <NotificationsList domain={NOTIFICATION_DOMAINS.SIDE} />
        );
      });
      it('should render the GenericNotification notification component', async () => {
        await waitForElement(() => rendered.getByText('Something went wrong'));
      });
    });
  });
});
