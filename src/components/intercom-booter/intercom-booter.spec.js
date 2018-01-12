import React from 'react';
import { shallow } from 'enzyme';
import { DOMAINS } from '@commercetools-local/constants';
import { INTERCOM_TRACKING_STATUS } from '../../constants';
import { IntercomBooter } from './intercom-booter';

let mockBoot;
jest.mock('../../utils/intercom', () => ({
  boot: (...args) => mockBoot(...args),
}));

const createTestProps = custom => ({
  user: {
    id: 1,
    firstName: 'Confoozius',
    tracking_intercom: INTERCOM_TRACKING_STATUS.pending,
  },
  showNotification: jest.fn(),
  ...custom,
});

let props;
let wrapper;

describe('lifecycle', () => {
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
      expect(bootIntercomFn).toHaveBeenCalledWith(props.user);
    });
    it('should call show banner', () => {
      expect(showBannerFn).toHaveBeenCalledTimes(1);
      expect(showBannerFn).toHaveBeenCalledWith(props.user);
    });
  });
  describe('componentWillReceiveProps', () => {
    let nextProps;
    beforeEach(() => {
      bootIntercomFn.mockClear();
      showBannerFn.mockClear();
      nextProps = { user: {} };
      wrapper.instance().componentWillReceiveProps(nextProps);
    });
    it('should call boot', () => {
      expect(bootIntercomFn).toHaveBeenCalledTimes(1);
      expect(bootIntercomFn).toHaveBeenCalledWith(nextProps.user);
    });
    it('should call show banner', () => {
      expect(showBannerFn).toHaveBeenCalledTimes(1);
      expect(showBannerFn).toHaveBeenCalledWith(nextProps.user);
    });
  });
});

describe('bootIntercom', () => {
  beforeEach(() => {
    mockBoot = jest.fn();
  });
  describe('when intercom is not booted yet', () => {
    describe('when user is defined', () => {
      describe('when tracking status is ACTIVE', () => {
        beforeEach(() => {
          props = createTestProps({
            user: {
              id: 1,
              tracking_intercom: INTERCOM_TRACKING_STATUS.active,
            },
          });
          wrapper = shallow(<IntercomBooter {...props} />);
          wrapper.instance().bootIntercom(props.user);
        });
        it('should boot intercom', () => {
          expect(mockBoot).toHaveBeenCalledTimes(1);
          expect(mockBoot).toHaveBeenCalledWith(props.user);
        });
        it('should set the flag hasBooted to true', () => {
          expect(wrapper.instance().hasBooted).toBe(true);
        });
      });
      describe('when tracking status is not ACTIVE', () => {
        beforeEach(() => {
          props = createTestProps();
          wrapper = shallow(<IntercomBooter {...props} />);
          wrapper.instance().bootIntercom(props.user);
        });
        it('should not boot intercom', () => {
          expect(mockBoot).toHaveBeenCalledTimes(0);
        });
      });
    });
    describe('when user is not defined', () => {
      beforeEach(() => {
        props = createTestProps({ user: null });
        wrapper = shallow(<IntercomBooter {...props} />);
        wrapper.instance().bootIntercom(props.user);
      });
      it('should not boot intercom', () => {
        expect(mockBoot).toHaveBeenCalledTimes(0);
      });
    });
  });
  describe('when intercom is already booted', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().hasBooted = true;
      wrapper.instance().bootIntercom(props.user);
    });
    it('should not boot intercom', () => {
      expect(mockBoot).toHaveBeenCalledTimes(0);
    });
  });
});

describe('showBanner', () => {
  describe('when intercom banner is not dispatched yet', () => {
    describe('when user is defined', () => {
      describe('when tracking status is PENDING', () => {
        beforeEach(() => {
          props = createTestProps({
            user: {
              id: 1,
              tracking_intercom: INTERCOM_TRACKING_STATUS.pending,
            },
          });
          wrapper = shallow(<IntercomBooter {...props} />);
          wrapper.instance().showBanner(props.user);
        });
        it('should boot intercom', () => {
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
            user: {
              id: 1,
              tracking_intercom: INTERCOM_TRACKING_STATUS.active,
            },
          });
          wrapper = shallow(<IntercomBooter {...props} />);
          wrapper.instance().showBanner(props.user);
        });
        it('should not boot intercom', () => {
          expect(props.showNotification).toHaveBeenCalledTimes(0);
        });
      });
    });
    describe('when user is not defined', () => {
      beforeEach(() => {
        props = createTestProps({ user: null });
        wrapper = shallow(<IntercomBooter {...props} />);
        wrapper.instance().showBanner(props.user);
      });
      it('should not boot intercom', () => {
        expect(props.showNotification).toHaveBeenCalledTimes(0);
      });
    });
  });
  describe('when intercom notification is already dispatched', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<IntercomBooter {...props} />);
      wrapper.instance().isNotificationDispatched = true;
      wrapper.instance().showBanner(props.user);
    });
    it('should not boot intercom', () => {
      expect(mockBoot).toHaveBeenCalledTimes(0);
    });
  });
});
