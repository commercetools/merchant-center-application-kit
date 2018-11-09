import { shallow } from 'enzyme';
import React from 'react';
import { DOMAINS } from '@commercetools-frontend/constants';
import NotificationsConnector from '../notifications-connector';
import GetCustomNotificationComponent from '../map-notification-to-component';
import GenericNotification from '../notification-kinds/generic';
import ApiErrorNotification from '../notification-kinds/api-error';
import UnexpectedErrorNotification from '../notification-kinds/unexpected-error';
import NotificationsList from './notifications-list';

const createTestProps = props => ({
  domain: DOMAINS.PAGE,
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<NotificationsList {...props} />);
  });
  describe('if there is a custom notification component', () => {
    const CustomComponent = () => <div />;
    CustomComponent.displayName = 'CustomComponent';
    const mapCustomComponent = jest.fn(() => CustomComponent);
    beforeEach(() => {
      wrapper = wrapper
        .find(NotificationsConnector)
        .renderProp('children', {
          notifications: [
            { id: 1, domain: DOMAINS.PAGE, kind: 'success', text: 'some-text' },
          ],
          removeNotification: jest.fn(),
        })
        .find(GetCustomNotificationComponent)
        .renderProp('render', mapCustomComponent);
    });
    it('should render the <CustomComponent> notification component', () => {
      expect(wrapper).toRender(CustomComponent);
    });
  });
  describe('if there is not a custom notification component', () => {
    describe('for PAGE notifications', () => {
      describe('if kind is "api-error"', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(NotificationsConnector)
            .renderProp('children', {
              notifications: [
                {
                  id: 1,
                  domain: DOMAINS.PAGE,
                  kind: 'api-error',
                  text: 'some-text',
                },
              ],
              removeNotification: jest.fn(),
            })
            .find(GetCustomNotificationComponent)
            .renderProp('render', () => null);
        });
        it('should render the <ApiErrorNotification> notification component', () => {
          expect(wrapper).toRender(ApiErrorNotification);
        });
      });
      describe('if kind is "unexpected-error"', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(NotificationsConnector)
            .renderProp('children', {
              notifications: [
                {
                  id: 1,
                  domain: DOMAINS.PAGE,
                  kind: 'unexpected-error',
                  text: 'some-text',
                },
              ],
              removeNotification: jest.fn(),
            })
            .find(GetCustomNotificationComponent)
            .renderProp('render', () => null);
        });
        it('should render the <UnexpectedErrorNotification> notification component', () => {
          expect(wrapper).toRender(UnexpectedErrorNotification);
        });
      });
      describe('if kind is "success"', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(NotificationsConnector)
            .renderProp('children', {
              notifications: [
                {
                  id: 1,
                  domain: DOMAINS.PAGE,
                  kind: 'success',
                  text: 'some-text',
                },
              ],
              removeNotification: jest.fn(),
            })
            .find(GetCustomNotificationComponent)
            .renderProp('render', () => null);
        });
        it('should render the <GenericNotification> notification component', () => {
          expect(wrapper).toRender(GenericNotification);
        });
      });
      describe('if kind is none of the above', () => {
        beforeEach(() => {
          // eslint-disable-next-line no-console
          console.error = jest.fn();
          wrapper = wrapper
            .find(NotificationsConnector)
            .renderProp('children', {
              notifications: [
                {
                  id: 1,
                  domain: DOMAINS.PAGE,
                  kind: 'non-existing',
                  text: 'some-text',
                },
              ],
              removeNotification: jest.fn(),
            })
            .find(GetCustomNotificationComponent)
            .renderProp('render', () => null);
        });
        it('should render null', () => {
          expect(wrapper).not.toRender({ notification: expect.any(Object) });
        });
        it('should log error to console', () => {
          // eslint-disable-next-line no-console
          expect(console.error).toHaveBeenCalledWith(
            'Saw unexpected notification kind "non-existing".',
            expect.any(Object)
          );
        });
      });
    });
    describe('for GLOBAL notifications', () => {
      describe('if kind is "unexpected-error"', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(NotificationsConnector)
            .renderProp('children', {
              notifications: [
                {
                  id: 1,
                  domain: DOMAINS.GLOBAL,
                  kind: 'unexpected-error',
                  text: 'some-text',
                },
              ],
              removeNotification: jest.fn(),
            })
            .find(GetCustomNotificationComponent)
            .renderProp('render', () => null);
        });
        it('should render the <UnexpectedErrorNotification> notification component', () => {
          expect(wrapper).toRender(UnexpectedErrorNotification);
        });
      });
      describe('if kind is "success"', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(NotificationsConnector)
            .renderProp('children', {
              notifications: [
                {
                  id: 1,
                  domain: DOMAINS.GLOBAL,
                  kind: 'success',
                  text: 'some-text',
                },
              ],
              removeNotification: jest.fn(),
            })
            .find(GetCustomNotificationComponent)
            .renderProp('render', () => null);
        });
        it('should render the <GenericNotification> notification component', () => {
          expect(wrapper).toRender(GenericNotification);
        });
      });
      describe('if kind is none of the above', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(NotificationsConnector)
            .renderProp('children', {
              notifications: [
                {
                  id: 1,
                  domain: DOMAINS.GLOBAL,
                  kind: 'non-existing',
                  text: 'some-text',
                },
              ],
              removeNotification: jest.fn(),
            })
            .find(GetCustomNotificationComponent)
            .renderProp('render', () => null);
        });
        it('should render null', () => {
          expect(wrapper).not.toRender({ notification: expect.any(Object) });
        });
        it('should log error to console', () => {
          // eslint-disable-next-line no-console
          expect(console.error).toHaveBeenCalledWith(
            'Saw unexpected notification kind "non-existing".',
            expect.any(Object)
          );
        });
      });
    });
    describe('for SIDE notifications', () => {
      describe('if kind is "success"', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(NotificationsConnector)
            .renderProp('children', {
              notifications: [
                {
                  id: 1,
                  domain: DOMAINS.SIDE,
                  kind: 'success',
                  text: 'some-text',
                },
              ],
              removeNotification: jest.fn(),
            })
            .find(GetCustomNotificationComponent)
            .renderProp('render', () => null);
        });
        it('should render the <GenericNotification> notification component', () => {
          expect(wrapper).toRender(GenericNotification);
        });
      });
      describe('if kind is none of the above', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(NotificationsConnector)
            .renderProp('children', {
              notifications: [
                {
                  id: 1,
                  domain: DOMAINS.SIDE,
                  kind: 'non-existing',
                  text: 'some-text',
                },
              ],
              removeNotification: jest.fn(),
            })
            .find(GetCustomNotificationComponent)
            .renderProp('render', () => null);
        });
        it('should render null', () => {
          expect(wrapper).not.toRender({ notification: expect.any(Object) });
        });
        it('should log error to console', () => {
          // eslint-disable-next-line no-console
          expect(console.error).toHaveBeenCalledWith(
            'Saw unexpected notification kind "non-existing".',
            expect.any(Object)
          );
        });
      });
    });
  });
});
