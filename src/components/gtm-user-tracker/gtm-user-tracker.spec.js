import React from 'react';
import { shallow } from 'enzyme';
import { updateUser } from '../../utils/gtm';
import { GtmUserTracker } from './gtm-user-tracker';

jest.mock('../../utils/gtm', () => ({
  updateUser: jest.fn(),
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
    wrapper = shallow(<GtmUserTracker {...props} />);
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
    let updateUserInstanceMethod;
    beforeEach(() => {
      updateUserInstanceMethod = jest.fn();
    });
    describe('when the user is loading', () => {
      beforeEach(() => {
        props = createTestProps({ userData: { isLoading: true } });
        wrapper = shallow(<GtmUserTracker {...props} />);
        wrapper.instance().updateUser = updateUserInstanceMethod;
        wrapper.instance().componentDidMount();
      });
      it('should not update the user', () => {
        expect(updateUserInstanceMethod).toHaveBeenCalledTimes(0);
      });
    });
    describe('when the user is loaded', () => {
      beforeEach(() => {
        props = createTestProps({ userData: { isLoading: false } });
        wrapper = shallow(<GtmUserTracker {...props} />);
        wrapper.instance().updateUser = updateUserInstanceMethod;
        wrapper.instance().componentDidMount();
      });
      it('should call updateUser', () => {
        expect(updateUserInstanceMethod).toHaveBeenCalledTimes(1);
        expect(updateUserInstanceMethod).toHaveBeenCalledWith(props);
      });
    });
  });

  describe('componentWillUpdate', () => {
    let updateUserInstanceMethod;
    beforeEach(() => {
      updateUserInstanceMethod = jest.fn();
    });
    describe('when the user is loading', () => {
      beforeEach(() => {
        props = createTestProps({ userData: { isLoading: true } });
        wrapper = shallow(<GtmUserTracker {...props} />);
        wrapper.instance().updateUser = updateUserInstanceMethod;
        wrapper.instance().componentWillUpdate(props);
      });
      it('should not update the user', () => {
        expect(updateUserInstanceMethod).toHaveBeenCalledTimes(0);
      });
    });
    describe('when the user is loaded', () => {
      beforeEach(() => {
        props = createTestProps({ userData: { isLoading: false } });
        wrapper = shallow(<GtmUserTracker {...props} />);
        wrapper.instance().updateUser = updateUserInstanceMethod;
        wrapper.instance().componentWillUpdate(props);
      });
      it('should call updateUser', () => {
        expect(updateUserInstanceMethod).toHaveBeenCalledTimes(1);
        expect(updateUserInstanceMethod).toHaveBeenCalledWith(props);
      });
    });
  });
});

describe('updateUser', () => {
  beforeEach(() => {
    updateUser.mockReset();
    props = createTestProps();
    wrapper = shallow(<GtmUserTracker {...props} />);
    wrapper.instance().updateUser(props);
  });
  it('should call update with user info', () => {
    expect(updateUser).toHaveBeenCalledTimes(1);
    expect(updateUser).toHaveBeenCalledWith(props.userData.user);
  });
});
