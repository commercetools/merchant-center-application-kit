import React from 'react';
import { shallow } from 'enzyme';
import { DOMAINS } from '@commercetools-local/constants';
import { INTERCOM_TRACKING_STATUS } from '../../constants';
import * as intercom from '../../utils/intercom';
import { IntercomBooter } from './intercom-booter';

jest.mock('../../utils/intercom');

const createTestProps = custom => ({
  showNotification: jest.fn(),
  intercomTrackingStatus: INTERCOM_TRACKING_STATUS.pending,
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
      expect(bootIntercomFn).toHaveBeenCalledWith(props.intercomTrackingStatus);
    });
    it('should call show banner', () => {
      expect(showBannerFn).toHaveBeenCalledTimes(1);
      expect(showBannerFn).toHaveBeenCalledWith(props.intercomTrackingStatus);
    });
  });
  describe('componentDidUpdate', () => {
    beforeEach(() => {
      bootIntercomFn.mockClear();
      showBannerFn.mockClear();
    });
    describe('when intercom is already booted', () => {
      beforeEach(() => {
        wrapper.instance().hasBooted = true;
        wrapper.instance().componentDidUpdate();
      });
      it('should not call boot', () => {
        expect(bootIntercomFn).not.toHaveBeenCalled();
      });
    });
    describe('when intercom is not booted yet', () => {
      beforeEach(() => {
        wrapper.instance().hasBooted = false;
        wrapper.instance().componentDidUpdate();
      });
      it('should call boot', () => {
        expect(bootIntercomFn).toHaveBeenCalledTimes(1);
        expect(bootIntercomFn).toHaveBeenCalledWith(
          props.intercomTrackingStatus
        );
      });
    });
    describe('when intercom banner has been shown', () => {
      beforeEach(() => {
        wrapper.instance().hasDispatchedNotification = true;
        wrapper.instance().componentDidUpdate();
      });
      it('should not call show banner', () => {
        expect(showBannerFn).not.toHaveBeenCalled();
      });
    });
    describe('when intercom banner has not been shown', () => {
      beforeEach(() => {
        wrapper.instance().hasDispatchedNotification = false;
        wrapper.instance().componentDidUpdate();
      });
      it('should call show banner', () => {
        expect(showBannerFn).toHaveBeenCalledTimes(1);
        expect(showBannerFn).toHaveBeenCalledWith(props.intercomTrackingStatus);
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
        intercomTrackingStatus: INTERCOM_TRACKING_STATUS.active,
      });
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().bootIntercom(props.intercomTrackingStatus);
    });
    it('should boot intercom', () => {
      expect(intercom.boot).toHaveBeenCalledTimes(1);
      expect(intercom.boot).toHaveBeenCalledWith(props.intercomTrackingStatus);
    });
    it('should set the flag hasBooted to true', () => {
      expect(wrapper.instance().hasBooted).toBe(true);
    });
  });
  describe('when tracking status is not ACTIVE', () => {
    beforeEach(() => {
      intercom.boot.mockClear();
      props = createTestProps({
        intercomTrackingStatus: null,
      });
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().bootIntercom(props.intercomTrackingStatus);
    });
    it('should not boot intercom', () => {
      expect(intercom.boot).not.toHaveBeenCalled();
    });
  });
});
describe('showBanner', () => {
  let props;
  let wrapper;
  describe('when tracking status is PENDING', () => {
    beforeEach(() => {
      props = createTestProps({
        intercomTrackingStatus: INTERCOM_TRACKING_STATUS.pending,
      });
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().showBanner(props.intercomTrackingStatus);
    });
    it('should dispatch notification', () => {
      expect(props.showNotification).toHaveBeenCalledTimes(1);
      expect(props.showNotification).toHaveBeenCalledWith({
        kind: 'intercom',
        domain: DOMAINS.GLOBAL,
      });
    });
    it('should set the flag hasDispatchedNotification to true', () => {
      expect(wrapper.instance().hasDispatchedNotification).toBe(true);
    });
  });
  describe('when tracking status is not PENDING', () => {
    beforeEach(() => {
      props = createTestProps({
        intercomTrackingStatus: null,
      });
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().showBanner(props.intercomTrackingStatus);
    });
    it('should not boot intercom', () => {
      expect(props.showNotification).not.toHaveBeenCalled();
    });
  });
});
