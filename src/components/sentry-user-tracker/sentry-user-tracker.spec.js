import React from 'react';
import { shallow } from 'enzyme';
import { SentryUserTracker } from './sentry-user-tracker';

let mockUpdateUser;
jest.mock('../../utils/sentry', () => ({
  updateUser: (...args) => mockUpdateUser(...args),
}));

const createTestProps = custom => ({
  userData: {
    isLoading: false,
    user: {
      id: 1,
      firstName: 'Confoozius',
    },
  },
  ...custom,
});

let props;
let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<SentryUserTracker {...props} />);
  });
  describe('shouldComponentUpdate', () => {
    describe('when user has not changed', () => {
      it('should not update', () => {
        expect(wrapper.instance().shouldComponentUpdate({ ...props })).toBe(
          false
        );
      });
    });
    describe('when user changed', () => {
      it('should update', () => {
        expect(
          wrapper.instance().shouldComponentUpdate({
            ...props,
            userData: { isLoading: false, user: { ...props.userData.user } },
          })
        ).toBe(true);
      });
    });
  });

  describe('componentDidMount', () => {
    let updateUser;
    beforeEach(() => {
      updateUser = jest.fn();
    });
    describe('when the user is loading', () => {
      beforeEach(() => {
        props = createTestProps({ userData: { isLoading: true } });
        wrapper = shallow(<SentryUserTracker {...props} />);
        wrapper.instance().updateUser = updateUser;
        wrapper.instance().componentDidMount();
      });
      it('should not update the user', () => {
        expect(updateUser).toHaveBeenCalledTimes(0);
      });
    });
    describe('when the user is loaded', () => {
      beforeEach(() => {
        props = createTestProps({ userData: { isLoading: false } });
        wrapper = shallow(<SentryUserTracker {...props} />);
        wrapper.instance().updateUser = updateUser;
        wrapper.instance().componentDidMount();
      });
      it('should call updateUser', () => {
        expect(updateUser).toHaveBeenCalledTimes(1);
        expect(updateUser).toHaveBeenCalledWith(props.userData);
      });
    });
  });

  describe('componentWillUpdate', () => {
    let updateUser;
    beforeEach(() => {
      updateUser = jest.fn();
    });
    describe('when the user is loading', () => {
      beforeEach(() => {
        props = createTestProps({ userData: { isLoading: true } });
        wrapper = shallow(<SentryUserTracker {...props} />);
        wrapper.instance().updateUser = updateUser;
        wrapper.instance().componentWillUpdate(props);
      });
      it('should not update the user', () => {
        expect(updateUser).toHaveBeenCalledTimes(0);
      });
    });
    describe('when the user is loaded', () => {
      beforeEach(() => {
        props = createTestProps({ userData: { isLoading: false } });
        wrapper = shallow(<SentryUserTracker {...props} />);
        wrapper.instance().updateUser = updateUser;
        wrapper.instance().componentWillUpdate(props);
      });
      it('should call updateUser', () => {
        expect(updateUser).toHaveBeenCalledTimes(1);
        expect(updateUser).toHaveBeenCalledWith(props.userData);
      });
    });
  });
});

describe('updateUser', () => {
  beforeEach(() => {
    mockUpdateUser = jest.fn();
    props = createTestProps();
    wrapper = shallow(<SentryUserTracker {...props} />);
    wrapper.instance().updateUser(props.userData);
  });
  it('should call update with user info', () => {
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    expect(mockUpdateUser).toHaveBeenCalledWith(props.userData.user);
  });
});
