import React from 'react';
import { shallow } from 'enzyme';
import { DOMAINS } from '@commercetools-local/constants';
import { SetupNotifications } from './setup-notifications';

const createTestProps = custom => ({
  activePlugin: 'products',
  globalNotifications: [{ text: '1' }, { text: '2' }],
  pageNotifications: [{ text: '3' }, { text: '4' }],
  sideNotifications: [{ text: '5' }, { text: '6' }],
  ...custom,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<SetupNotifications {...props} />);
  });
  it('should render three notification portals', () => {
    expect(wrapper).toRenderElementTimes('NotificationPortal', 3);
  });
  describe('notification portal for global notifications', () => {
    let portalWrapper;
    beforeEach(() => {
      portalWrapper = shallow(
        <div>
          {wrapper
            .find('NotificationPortal')
            .at(0)
            .prop('renderNotification')()}
        </div>
      );
    });
    it('should render a notification protal', () => {
      expect(wrapper.find('NotificationPortal').at(0)).toHaveProp(
        'domain',
        DOMAINS.GLOBAL
      );
    });
    it('should render a NotificationsList', () => {
      expect(portalWrapper).toRender('NotificationsList');
    });
    it('should pass `global` as domain', () => {
      expect(portalWrapper.find('NotificationsList')).toHaveProp(
        'domain',
        DOMAINS.GLOBAL
      );
    });
    it('should pass the active plugn', () => {
      expect(portalWrapper.find('NotificationsList')).toHaveProp(
        'activePlugin',
        'products'
      );
    });
    it('should pass the global notifications', () => {
      expect(portalWrapper.find('NotificationsList')).toHaveProp(
        'notifications',
        props.globalNotifications
      );
    });
  });
  describe('notification portal for page notifications', () => {
    let portalWrapper;
    beforeEach(() => {
      portalWrapper = shallow(
        <div>
          {wrapper
            .find('NotificationPortal')
            .at(1)
            .prop('renderNotification')()}
        </div>
      );
    });
    it('should render a notification protal', () => {
      expect(wrapper.find('NotificationPortal').at(1)).toHaveProp(
        'domain',
        DOMAINS.PAGE
      );
    });
    it('should render a NotificationsList', () => {
      expect(portalWrapper).toRender('NotificationsList');
    });
    it('should pass `page` as domain', () => {
      expect(portalWrapper.find('NotificationsList')).toHaveProp(
        'domain',
        DOMAINS.PAGE
      );
    });
    it('should pass the active plugn', () => {
      expect(portalWrapper.find('NotificationsList')).toHaveProp(
        'activePlugin',
        'products'
      );
    });
    it('should pass the page notifications', () => {
      expect(portalWrapper.find('NotificationsList')).toHaveProp(
        'notifications',
        props.pageNotifications
      );
    });
  });
  describe('notification portal for side notifications', () => {
    let portalWrapper;
    beforeEach(() => {
      portalWrapper = shallow(
        <div>
          {wrapper
            .find('NotificationPortal')
            .at(2)
            .prop('renderNotification')()}
        </div>
      );
    });
    it('should render a notification protal', () => {
      expect(wrapper.find('NotificationPortal').at(2)).toHaveProp(
        'domain',
        DOMAINS.SIDE
      );
    });
    it('should render a NotificationsList', () => {
      expect(portalWrapper).toRender('NotificationsList');
    });
    it('should pass `side` as domain', () => {
      expect(portalWrapper.find('NotificationsList')).toHaveProp(
        'domain',
        DOMAINS.SIDE
      );
    });
    it('should pass the active plugn', () => {
      expect(portalWrapper.find('NotificationsList')).toHaveProp(
        'activePlugin',
        'products'
      );
    });
    it('should pass the side notifications', () => {
      expect(portalWrapper.find('NotificationsList')).toHaveProp(
        'notifications',
        props.sideNotifications
      );
    });
  });
});
