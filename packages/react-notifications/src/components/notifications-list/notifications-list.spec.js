import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { render, waitForElement } from '@testing-library/react';
import { DOMAINS } from '@commercetools-frontend/constants';
import { useCustomNotificationComponent } from '../map-notification-to-component';
import NotificationsList from './notifications-list';

const CustomComponent = () => <div>{'Custom component'}</div>;
CustomComponent.displayName = 'CustomComponent';

jest.mock('react-redux');
jest.mock('../map-notification-to-component');

const renderComponent = (ui, options) =>
  render(
    <IntlProvider locale="en" messages={{}}>
      {ui}
    </IntlProvider>,
    options
  );

describe('rendering', () => {
  let rendered;
  beforeEach(() => {
    useSelector.mockClear();
    useSelector.mockReturnValue({ page: [], side: [], global: [] });
    useCustomNotificationComponent.mockClear();
    useCustomNotificationComponent.mockReturnValue(() => null);
  });
  describe('if there is a custom notification component', () => {
    beforeEach(() => {
      useSelector.mockClear();
      useSelector.mockReturnValue({
        page: [
          {
            id: 1,
            domain: DOMAINS.PAGE,
            kind: 'error',
            text: 'Something went wrong',
          },
        ],
      });
      useCustomNotificationComponent.mockClear();
      useCustomNotificationComponent.mockReturnValue(() => CustomComponent);
      rendered = renderComponent(<NotificationsList domain={DOMAINS.PAGE} />);
    });
    it('should render the <CustomComponent> notification component', async () => {
      await waitForElement(() => rendered.getByText('Custom component'));
    });
  });
  describe('for domain: page', () => {
    describe('for kind: error', () => {
      beforeEach(() => {
        useSelector.mockClear();
        useSelector.mockReturnValue({
          page: [
            {
              id: 1,
              domain: DOMAINS.PAGE,
              kind: 'error',
              text: 'Something went wrong',
            },
          ],
        });
        rendered = renderComponent(<NotificationsList domain={DOMAINS.PAGE} />);
      });
      it('should render the GenericNotification notification component', async () => {
        await waitForElement(() => rendered.getByText('Something went wrong'));
      });
    });
    describe('for kind: api-error', () => {
      beforeEach(() => {
        useSelector.mockClear();
        useSelector.mockReturnValue({
          page: [
            {
              id: 1,
              domain: DOMAINS.PAGE,
              kind: 'api-error',
              values: {
                errors: [
                  {
                    code: 'ConcurrentModification',
                    message: 'Concurrent modification',
                  },
                ],
              },
            },
          ],
        });
        rendered = renderComponent(<NotificationsList domain={DOMAINS.PAGE} />);
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
        useSelector.mockClear();
        useSelector.mockReturnValue({
          page: [
            {
              id: 1,
              domain: DOMAINS.PAGE,
              kind: 'unexpected-error',
              values: {},
            },
          ],
        });
        rendered = renderComponent(<NotificationsList domain={DOMAINS.PAGE} />);
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
        useSelector.mockClear();
        useSelector.mockReturnValue({
          global: [
            {
              id: 1,
              domain: DOMAINS.GLOBAL,
              kind: 'error',
              text: 'Something went wrong',
            },
          ],
        });
        rendered = renderComponent(
          <NotificationsList domain={DOMAINS.GLOBAL} />
        );
      });
      it('should render the GenericNotification notification component', async () => {
        await waitForElement(() => rendered.getByText('Something went wrong'));
      });
    });
    describe('for kind: unexpected-error', () => {
      beforeEach(() => {
        useSelector.mockClear();
        useSelector.mockReturnValue({
          global: [
            {
              id: 1,
              domain: DOMAINS.GLOBAL,
              kind: 'unexpected-error',
              values: {},
            },
          ],
        });
        rendered = renderComponent(
          <NotificationsList domain={DOMAINS.GLOBAL} />
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
        useSelector.mockClear();
        useSelector.mockReturnValue({
          side: [
            {
              id: 1,
              domain: DOMAINS.SIDE,
              kind: 'error',
              text: 'Something went wrong',
            },
          ],
        });
        rendered = renderComponent(<NotificationsList domain={DOMAINS.SIDE} />);
      });
      it('should render the GenericNotification notification component', async () => {
        await waitForElement(() => rendered.getByText('Something went wrong'));
      });
    });
  });
});
