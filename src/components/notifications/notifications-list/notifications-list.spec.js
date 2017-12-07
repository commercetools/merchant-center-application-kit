import { shallow } from 'enzyme';
import React from 'react';
import { DOMAINS } from '@commercetools-local/constants';
import { NotificationsList, isNotificationVisible } from './notifications-list';

const createTestProps = props => ({
  domain: DOMAINS.PAGE,
  notifications: [],
  activePlugin: null,
  ...props,
});

describe('rendering', () => {
  it('outputs correct tree', () => {
    const props = createTestProps({
      notifications: [
        { id: 1, domain: DOMAINS.PAGE, kind: 'success', text: 'some-text' },
        { id: 2, domain: DOMAINS.PAGE, kind: 'info', text: 'some-other-text' },
        { id: 3, domain: DOMAINS.GLOBAL, kind: 'info', text: 'some-more-text' },
      ],
    });
    const wrapper = shallow(<NotificationsList {...props} />, {
      context: { store: { dispatch: jest.fn() } },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('displays notifications', () => {
    const props = createTestProps({
      notifications: [
        { id: 1, domain: DOMAINS.PAGE, kind: 'success', text: 'some-text' },
        { id: 2, domain: DOMAINS.PAGE, kind: 'info', text: 'some-other-text' },
      ],
    });
    const wrapper = shallow(<NotificationsList {...props} />, {
      context: { store: { dispatch: jest.fn() } },
    });
    expect(wrapper).toMatchSnapshot();
  });
});

describe('mapPluginNotificationToComponent', () => {
  it('can return a component that is preferred to internal kinds', () => {
    const FooNotification = () => <div />;
    const props = createTestProps({
      notifications: [
        { id: 1, domain: DOMAINS.PAGE, kind: 'success', text: 'some-text' },
        { id: 2, domain: DOMAINS.PAGE, kind: 'info', text: 'some-other-text' },
      ],
    });
    const wrapper = shallow(
      <NotificationsList
        {...props}
        mapPluginNotificationToComponent={notification =>
          notification.kind === 'success' ? FooNotification : null
        }
      />,
      { context: { store: { dispatch: jest.fn() } } }
    );
    expect(wrapper).toRender(FooNotification);
  });

  describe('side-notifications', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createTestProps({
        notifications: [
          {
            id: 1,
            domain: DOMAINS.SIDE,
            kind: 'success',
            text: 'some-success-text',
          },
          {
            id: 2,
            domain: DOMAINS.SIDE,
            kind: 'info',
            text: 'some-info-text',
          },
          {
            id: 3,
            domain: DOMAINS.SIDE,
            kind: 'warning',
            text: 'some-warning-text',
          },
          {
            id: 4,
            domain: DOMAINS.SIDE,
            kind: 'error',
            text: 'some-error-text',
          },
        ],
      });
      wrapper = shallow(<NotificationsList {...props} />, {
        context: { store: { dispatch: jest.fn() } },
      });
    });

    it('should map the message kind to the correct components', () => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('GenericNotification')).toHaveLength(4);
    });
  });
});

describe('isNotificationVisible', () => {
  describe('when no plugin is active', () => {
    it('should show global notifications', () => {
      expect(isNotificationVisible(null, null)).toBe(true);
    });
    it('should hide plugin notifications', () => {
      expect(isNotificationVisible(null, 'non-active-plugin')).toBe(false);
    });
  });
  describe('when a plugin is active', () => {
    it('should show global notifications', () => {
      expect(isNotificationVisible('active-plugin', null)).toBe(true);
    });
    it('should hide notifications from other plugins', () => {
      expect(isNotificationVisible('active-plugin', 'non-active-plugin')).toBe(
        false
      );
    });
    it('should show notifications from the active plugin', () => {
      expect(isNotificationVisible('active-plugin', 'active-plugin')).toBe(
        true
      );
    });
  });
});
