import React from 'react';
import { shallow } from 'enzyme';
import { INTERCOM_TRACKING_STATUS } from '../../constants';
import { BootIntercom } from './boot-intercom';

let mockBoot;
jest.mock('../../utils/intercom', () => ({
  boot: (...args) => mockBoot(...args),
}));

const createTestProps = custom => ({
  userData: {
    isLoading: false,
    user: {
      id: 1,
      firstName: 'Confoozius',
      tracking_intercom: INTERCOM_TRACKING_STATUS.active,
    },
  },
  ...custom,
});

let props;
let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<BootIntercom {...props} />);
  });

  describe('componentDidMount', () => {
    let boot;
    beforeEach(() => {
      boot = jest.fn();
      wrapper.instance().bootIntercom = boot;
      wrapper.instance().componentDidMount();
    });
    it('should call boot', () => {
      expect(boot).toHaveBeenCalledTimes(1);
      expect(boot).toHaveBeenCalledWith(props);
    });
  });

  describe('componentWillReceiveProps', () => {
    let boot;
    const nextProps = {};
    beforeEach(() => {
      boot = jest.fn();
      wrapper.instance().bootIntercom = boot;
      wrapper.instance().componentWillReceiveProps(nextProps);
    });
    it('should call boot', () => {
      expect(boot).toHaveBeenCalledTimes(1);
      expect(boot).toHaveBeenCalledWith(nextProps);
    });
  });
});

describe('bootIntercom', () => {
  beforeEach(() => {
    mockBoot = jest.fn();
  });
  describe('when the user is loading', () => {
    beforeEach(() => {
      props = createTestProps({ userData: { isLoading: true } });
      wrapper = shallow(<BootIntercom {...props} />);
      wrapper.instance().bootIntercom(props);
    });
    it('should not call boot', () => {
      expect(mockBoot).toHaveBeenCalledTimes(0);
    });
  });
  describe('when intercom already booted', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<BootIntercom {...props} />);
      wrapper.instance().hasBooted = true;
      wrapper.instance().bootIntercom(props);
    });
    it('should not call boot', () => {
      expect(mockBoot).toHaveBeenCalledTimes(0);
    });
  });
  describe('when user denied intercom', () => {
    beforeEach(() => {
      props = createTestProps({
        userData: {
          isLoading: false,
          user: { tracking_intercom: INTERCOM_TRACKING_STATUS.inactive },
        },
      });
      wrapper = shallow(<BootIntercom {...props} />);
      wrapper.instance().bootIntercom(props);
    });
    it('should not call boot', () => {
      expect(mockBoot).toHaveBeenCalledTimes(0);
    });
  });
  describe('when user has not decided to use intercom', () => {
    beforeEach(() => {
      props = createTestProps({
        userData: {
          isLoading: false,
          user: { tracking_intercom: INTERCOM_TRACKING_STATUS.pending },
        },
      });
      wrapper = shallow(<BootIntercom {...props} />);
      wrapper.instance().bootIntercom(props);
    });
    it('should not call boot', () => {
      expect(mockBoot).toHaveBeenCalledTimes(0);
    });
  });
  describe('when intercom has not booted yet', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<BootIntercom {...props} />);
      wrapper.instance().bootIntercom(props);
    });
    it('should call boot with user info', () => {
      expect(mockBoot).toHaveBeenCalledTimes(1);
      expect(mockBoot).toHaveBeenCalledWith(props.userData.user);
    });
  });
});
