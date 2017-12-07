import React from 'react';
import { createPortal } from 'react-dom';
import { shallow } from 'enzyme';
import { DOMAINS } from '@commercetools-local/constants';
import { NotificationPortal } from './notification-portal';

jest.mock('react-dom');

const createTestProps = custom => ({
  renderNotification: jest.fn(),
  domain: DOMAINS.PAGE,
  ...custom,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    createPortal.mockImplementation(() => <div id="page-notifications" />);
  });
  describe('when there component has not mounted yet', () => {
    beforeEach(() => {
      wrapper = shallow(<NotificationPortal {...props} />);
    });
    it('should render nothing', () => {
      expect(wrapper.type()).toBe(null);
    });
  });
  describe('when the portal note is set', () => {
    beforeEach(() => {
      wrapper = shallow(<NotificationPortal {...props} />);
      wrapper.setState({ portalNode: 'i am here now' });
    });
    it('should render the page notifications', () => {
      expect(wrapper).toContainReact(<div id="page-notifications" />);
    });
  });
});
