import React from 'react';
import { shallow } from 'enzyme';
import { IntercomUserTracker } from './intercom-user-tracker';

let mockUpdateUser;
jest.mock('../../utils/intercom', () => ({
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
  projectKey: 'the-foo-bar',
  projectData: {
    isLoading: false,
    project: {
      owner: {
        name: 'BarCamp',
      },
    },
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
  describe('shouldComponentUpdate', () => {
    describe('when neither project nor user changed', () => {
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
    describe('when project changed', () => {
      it('should update', () => {
        expect(
          wrapper.instance().shouldComponentUpdate({
            ...props,
            projectData: {
              isLoading: false,
              project: { ...props.projectData.project },
            },
          })
        ).toBe(true);
      });
    });
  });

  describe('componentDidMount', () => {
    let updateUser;
    beforeEach(() => {
      updateUser = jest.fn();
      wrapper.instance().updateUser = updateUser;
      wrapper.instance().componentDidMount();
    });
    it('should call updateUser', () => {
      expect(updateUser).toHaveBeenCalledTimes(1);
      expect(updateUser).toHaveBeenCalledWith(props);
    });
  });

  describe('componentWillUpdate', () => {
    let updateUser;
    const nextProps = {};
    beforeEach(() => {
      updateUser = jest.fn();
      wrapper.instance().updateUser = updateUser;
      wrapper.instance().componentWillUpdate(nextProps);
    });
    it('should call updateUser', () => {
      expect(updateUser).toHaveBeenCalledTimes(1);
      expect(updateUser).toHaveBeenCalledWith(nextProps);
    });
  });
});

describe('updateUser', () => {
  beforeEach(() => {
    mockUpdateUser = jest.fn();
  });
  describe('when the user is loading', () => {
    beforeEach(() => {
      props = createTestProps({ userData: { isLoading: true } });
      wrapper = shallow(<IntercomUserTracker {...props} />);
      wrapper.instance().updateUser(props);
    });
    it('should not update the user', () => {
      expect(mockUpdateUser).toHaveBeenCalledTimes(0);
    });
  });
  describe('when the user is loaded', () => {
    describe('when the project key is set', () => {
      describe('when the project is loading', () => {
        beforeEach(() => {
          props = createTestProps({ projectData: { isLoading: true } });
          wrapper = shallow(<IntercomUserTracker {...props} />);
          wrapper.instance().updateUser(props);
        });
        it('should call update without the organization info', () => {
          expect(mockUpdateUser).toHaveBeenCalledTimes(1);
          expect(mockUpdateUser).toHaveBeenCalledWith(props.userData.user);
        });
      });
      describe('when the project is loaded', () => {
        beforeEach(() => {
          props = createTestProps();
          wrapper = shallow(<IntercomUserTracker {...props} />);
          wrapper.instance().updateUser(props);
        });
        it('should call update with the organization info', () => {
          expect(mockUpdateUser).toHaveBeenCalledTimes(1);
          expect(mockUpdateUser).toHaveBeenCalledWith({
            ...props.userData.user,
            organization: props.projectData.project.owner,
          });
        });
      });
    });
    describe('when the project key is not set', () => {
      beforeEach(() => {
        props = createTestProps({ projectKey: undefined });
        wrapper = shallow(<IntercomUserTracker {...props} />);
        wrapper.instance().updateUser(props);
      });
      it('should call update without the organization info', () => {
        expect(mockUpdateUser).toHaveBeenCalledTimes(1);
        expect(mockUpdateUser).toHaveBeenCalledWith(props.userData.user);
      });
    });
  });
});
