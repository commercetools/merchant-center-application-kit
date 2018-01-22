import React from 'react';
import { shallow } from 'enzyme';
import { updateUser } from '../../utils/intercom';
import { IntercomUserTracker } from './intercom-user-tracker';

jest.mock('../../utils/intercom');

const createTestProps = custom => ({
  user: {
    id: 1,
    firstName: 'Confoozius',
  },
  organization: {
    name: 'BarCamp',
  },
  ...custom,
});

let props;
let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<IntercomUserTracker {...props} />);
  });
  describe('componentDidMount', () => {
    let syncUserMock;
    beforeEach(() => {
      syncUserMock = jest.fn();
    });
    describe('when the user is not defined', () => {
      beforeEach(() => {
        props = createTestProps({ user: null });
        wrapper = shallow(<IntercomUserTracker {...props} />);
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
        wrapper = shallow(<IntercomUserTracker {...props} />);
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
        wrapper = shallow(<IntercomUserTracker {...props} />);
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
        wrapper = shallow(<IntercomUserTracker {...props} />);
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
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<IntercomUserTracker {...props} />);
    wrapper.instance().syncUser();
  });
  it('should call updateUser with the user object', () => {
    expect(updateUser).toHaveBeenCalledWith(
      expect.objectContaining(props.user)
    );
  });
  it('should call updateUser with the organization object', () => {
    expect(updateUser).toHaveBeenCalledWith(
      expect.objectContaining({ organization: props.organization })
    );
  });
  describe('when the organization is not defined', () => {
    beforeEach(() => {
      props = createTestProps({ organization: null });
      wrapper = shallow(<IntercomUserTracker {...props} />);
      wrapper.instance().syncUser();
    });
    it('should call updateUser without the organization object', () => {
      expect(updateUser).not.toHaveBeenCalledWith(
        expect.objectContaining({ organization: props.organization })
      );
    });
  });
});
