import React from 'react';
import { shallow } from 'enzyme';
import { DOMAINS } from '@commercetools-local/constants';
import { INTERCOM_TRACKING_STATUS } from '../../constants';
import * as intercom from '../../utils/intercom';
import { IntercomBooter } from './intercom-booter';

jest.mock('../../utils/intercom');

const createTestProps = custom => ({
  showNotification: jest.fn(),
  intercomTracking: INTERCOM_TRACKING_STATUS.pending,
  ...custom,
});

describe('lifecycle', () => {
  let props;
  let wrapper;
  let bootIntercomFn;
  let showBannerFn;
  beforeEach(() => {
    bootIntercomFn = jest.fn();
    showBannerFn = jest.fn();
    props = createTestProps();
    wrapper = shallow(<IntercomBooter {...props} />);
    wrapper.instance().bootIntercom = bootIntercomFn;
    wrapper.instance().showBanner = showBannerFn;
    wrapper.instance().componentDidMount();
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      bootIntercomFn.mockClear();
      showBannerFn.mockClear();
      wrapper.instance().componentDidMount();
    });
    it('should call boot', () => {
      expect(bootIntercomFn).toHaveBeenCalledTimes(1);
      expect(bootIntercomFn).toHaveBeenCalledWith(props.intercomTracking);
    });
    it('should call show banner', () => {
      expect(showBannerFn).toHaveBeenCalledTimes(1);
      expect(showBannerFn).toHaveBeenCalledWith(props.intercomTracking);
    });
  });
  describe('componentWillReceiveProps', () => {
    let nextProps;
    beforeEach(() => {
      bootIntercomFn.mockClear();
      showBannerFn.mockClear();
      nextProps = { intercomTracking: null };
    });
    describe('when intercom is already booted', () => {
      beforeEach(() => {
        wrapper.instance().isBooted = true;
        wrapper.instance().componentWillReceiveProps(nextProps);
      });
      it('should not call boot', () => {
        expect(bootIntercomFn).toHaveBeenCalledTimes(0);
      });
    });
    describe('when intercom is not booted yet', () => {
      beforeEach(() => {
        wrapper.instance().isBooted = false;
        wrapper.instance().componentWillReceiveProps(nextProps);
      });
      it('should call boot', () => {
        expect(bootIntercomFn).toHaveBeenCalledTimes(1);
        expect(bootIntercomFn).toHaveBeenCalledWith(nextProps.intercomTracking);
      });
    });
    describe('when intercom banner is alread dispatched', () => {
      beforeEach(() => {
        wrapper.instance().isNotificationDispatched = true;
        wrapper.instance().componentWillReceiveProps(nextProps);
      });
      it('should not call show banner', () => {
        expect(showBannerFn).toHaveBeenCalledTimes(0);
      });
    });
    describe('when intercom banner is not dispatched yet', () => {
      beforeEach(() => {
        wrapper.instance().isNotificationDispatched = false;
        wrapper.instance().componentWillReceiveProps(nextProps);
      });
      it('should call show banner', () => {
        expect(showBannerFn).toHaveBeenCalledTimes(1);
        expect(showBannerFn).toHaveBeenCalledWith(nextProps.intercomTracking);
      });
    });
  });
});

describe('bootIntercom', () => {
  let props;
  let wrapper;
  describe('when tracking status is ACTIVE', () => {
    beforeEach(() => {
      intercom.boot.mockClear();
      props = createTestProps({
        intercomTracking: INTERCOM_TRACKING_STATUS.active,
      });
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().bootIntercom(props.intercomTracking);
    });
    it('should boot intercom', () => {
      expect(intercom.boot).toHaveBeenCalledTimes(1);
      expect(intercom.boot).toHaveBeenCalledWith(props.intercomTracking);
    });
    it('should set the flag hasBooted to true', () => {
      expect(wrapper.instance().hasBooted).toBe(true);
    });
  });
  describe('when tracking status is not ACTIVE', () => {
    beforeEach(() => {
      intercom.boot.mockClear();
      props = createTestProps({
        intercomTracking: null,
      });
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().bootIntercom(props.intercomTracking);
    });
    it('should not boot intercom', () => {
      expect(intercom.boot).toHaveBeenCalledTimes(0);
    });
  });
});
describe('showBanner', () => {
  let props;
  let wrapper;
  describe('when tracking status is PENDING', () => {
    beforeEach(() => {
      props = createTestProps({
        intercomTracking: INTERCOM_TRACKING_STATUS.pending,
      });
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().showBanner(props.intercomTracking);
    });
    it('should dispatch notification', () => {
      expect(props.showNotification).toHaveBeenCalledTimes(1);
      expect(props.showNotification).toHaveBeenCalledWith({
        kind: 'intercom',
        domain: DOMAINS.GLOBAL,
      });
    });
    it('should set the flag isNotificationDispatched to true', () => {
      expect(wrapper.instance().isNotificationDispatched).toBe(true);
    });
  });
  describe('when tracking status is not PENDING', () => {
    beforeEach(() => {
      props = createTestProps({
        intercomTracking: null,
      });
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().showBanner(props.intercomTracking);
    });
    it('should not boot intercom', () => {
      expect(props.showNotification).toHaveBeenCalledTimes(0);
    });
  });
});
