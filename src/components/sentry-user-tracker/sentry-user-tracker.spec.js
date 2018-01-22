import React from 'react';
import { shallow } from 'enzyme';
import { updateUser } from '../../utils/sentry';
import SentryUserTracker from './sentry-user-tracker';

jest.mock('../../utils/sentry');

const createTestProps = custom => ({
  user: {
    id: 1,
    firstName: 'Confoozius',
  },
  ...custom,
});

describe('lifecycle', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<SentryUserTracker {...props} />);
  });
  describe('componentDidMount', () => {
    let syncUserMock;
    beforeEach(() => {
      syncUserMock = jest.fn();
    });
    describe('when the user is not defined', () => {
      beforeEach(() => {
        props = createTestProps({ user: null });
        wrapper = shallow(<SentryUserTracker {...props} />);
        wrapper.instance().syncUser = syncUserMock;
        wrapper.instance().componentDidMount();
      });
      it('should not call syncUser', () => {
        expect(syncUserMock).toHaveBeenCalledTimes(0);
      });
    });
    describe('when the user is defined', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<SentryUserTracker {...props} />);
        wrapper.instance().syncUser = syncUserMock;
        wrapper.instance().componentDidMount();
      });
      it('should call syncUser', () => {
        expect(syncUserMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('componentDidUpdate', () => {
    let syncUserMock;
    beforeEach(() => {
      syncUserMock = jest.fn();
    });
    describe('when the user not defined', () => {
      beforeEach(() => {
        props = createTestProps({ user: null });
        wrapper = shallow(<SentryUserTracker {...props} />);
        wrapper.instance().syncUser = syncUserMock;
        wrapper.instance().componentDidUpdate();
      });
      it('should not update the user', () => {
        expect(syncUserMock).toHaveBeenCalledTimes(0);
      });
    });
    describe('when the user is defined', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<SentryUserTracker {...props} />);
        wrapper.instance().syncUser = syncUserMock;
        wrapper.instance().componentDidUpdate(props);
      });
      it('should call syncUserMock', () => {
        expect(syncUserMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe('syncUser', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<SentryUserTracker {...props} />);
    wrapper.instance().syncUser();
  });
  it('should call updateUser with the user object', () => {
    expect(updateUser).toHaveBeenCalledWith(
      expect.objectContaining(props.user)
    );
  });
});
