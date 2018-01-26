import React from 'react';
import { shallow } from 'enzyme';
import { GraphQlTargets, DOMAINS } from '@commercetools-local/constants';
import { INTERCOM_TRACKING_STATUS } from '../../../constants';
import * as intercom from '../../../utils/intercom';
import { IntercomNotification } from './intercom';

jest.mock('../../../utils/intercom');

const createTestProps = custom => ({
  dismiss: jest.fn(),
  notification: {
    id: 1,
    kind: 'intercom',
    domain: DOMAINS.GLOBAL,
  },
  changeIntercomStatus: jest.fn(),
  showUnexpectedErrorNotification: jest.fn(),
  environmentName: 'test',
  ...custom,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<IntercomNotification {...props} />);
  });
  it('should render a Notification wrapper', () => {
    expect(wrapper).toRender('Notification');
  });
  it('should render a Message with title', () => {
    expect(wrapper.find('FormattedMessage')).toHaveProp(
      'id',
      'GlobalNotification.title'
    );
  });
  describe('values for FormattedMessage', () => {
    let valueWrapper;
    describe('linkToIntercom', () => {
      beforeEach(() => {
        valueWrapper = shallow(
          wrapper.find('FormattedMessage').prop('values').linkToIntercom
        );
      });
      it('should match snapshot', () => {
        expect(valueWrapper).toMatchSnapshot();
      });
    });
    describe('link', () => {
      beforeEach(() => {
        valueWrapper = shallow(
          wrapper.find('FormattedMessage').prop('values').link
        );
      });
      it('should match snapshot', () => {
        expect(valueWrapper).toMatchSnapshot();
      });
    });
  });
});

describe('interactions', () => {
  let props;
  let wrapper;
  describe('handleMutationError', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<IntercomNotification {...props} />);
      return wrapper.instance().handleMutationError(new Error('Oops'));
    });
    it('should dispatch error notification', () => {
      expect(props.showUnexpectedErrorNotification).toHaveBeenCalledTimes(1);
      expect(props.showUnexpectedErrorNotification).toHaveBeenCalledWith({
        error: new Error('Oops'),
      });
    });
  });
  describe('handleOptOutLinkClick', () => {
    beforeEach(() => {
      intercom.shutdown.mockClear();
      props = createTestProps({
        changeIntercomStatus: jest.fn(() => Promise.resolve()),
      });
      wrapper = shallow(<IntercomNotification {...props} />);
      return wrapper.instance().handleOptOutLinkClick();
    });
    it('should trigger mutation', () => {
      expect(props.changeIntercomStatus).toHaveBeenCalledTimes(1);
    });
    it('should trigger mutation passing variable "mc" target', () => {
      expect(props.changeIntercomStatus).toHaveBeenCalledWith({
        variables: expect.objectContaining({
          target: GraphQlTargets.MerchantCenterBackend,
        }),
      });
    });
    it('should trigger mutation passing variable "INACTIVE" status', () => {
      expect(props.changeIntercomStatus).toHaveBeenCalledWith({
        variables: expect.objectContaining({
          status: INTERCOM_TRACKING_STATUS.inactive,
        }),
      });
    });
    it('should dismiss notification', () => {
      expect(props.dismiss).toHaveBeenCalledTimes(1);
    });
  });
  describe('handleCloseNotification', () => {
    beforeEach(() => {
      intercom.changePage.mockClear();
      props = createTestProps({
        changeIntercomStatus: jest.fn(() => Promise.resolve()),
      });
      wrapper = shallow(<IntercomNotification {...props} />);
      return wrapper.instance().handleCloseNotification();
    });
    it('should trigger mutation', () => {
      expect(props.changeIntercomStatus).toHaveBeenCalledTimes(1);
    });
    it('should trigger mutation passing variable "mc" target', () => {
      expect(props.changeIntercomStatus).toHaveBeenCalledWith({
        variables: expect.objectContaining({
          target: GraphQlTargets.MerchantCenterBackend,
        }),
      });
    });
    it('should trigger mutation passing variable "ACTIVE" status', () => {
      expect(props.changeIntercomStatus).toHaveBeenCalledWith({
        variables: expect.objectContaining({
          status: INTERCOM_TRACKING_STATUS.active,
        }),
      });
    });
    it('should dismiss notification', () => {
      expect(props.dismiss).toHaveBeenCalledTimes(1);
    });
  });
});
