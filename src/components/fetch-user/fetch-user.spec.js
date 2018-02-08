import React from 'react';
import { shallow } from 'enzyme';
import LoggedInUserQuery from './fetch-user.graphql';
import { FetchUser, withUser } from './fetch-user';

describe('rendering', () => {
  let props;
  let wrapper;

  describe('<FetchUser>', () => {
    beforeEach(() => {
      props = {
        children: jest.fn(),
        // this is usually injected by graphql
        userData: {
          isLoading: false,
          user: {
            firstName: 'John',
          },
        },
      };
      wrapper = shallow(<FetchUser {...props} />);
    });
    it('should call children with userData object', () => {
      expect(props.children).toHaveBeenCalledWith(props.userData);
    });
  });

  describe('withUser()', () => {
    let wrapperRender;

    describe('when mapDataToProps is defined', () => {
      beforeEach(() => {
        // eslint-disable-next-line react/prop-types
        const Profile = ({ firstName }) => <div>{firstName}</div>;
        const ProfileWithUser = withUser(userData => ({
          firstName: userData.user.firstName,
        }))(Profile);
        wrapper = shallow(<ProfileWithUser foo="bar" />);
        wrapperRender = shallow(
          wrapper.prop('children')({ user: { firstName: 'John' } })
        );
      });
      it('should render <Profile> with firstName', () => {
        expect(wrapperRender).toMatchElement(<div>{'John'}</div>);
      });
      it('should render FetchUser internally', () => {
        expect(wrapper).toRender('FetchUser');
      });
    });
    describe('when mapDataToProps is not defined', () => {
      beforeEach(() => {
        // eslint-disable-next-line react/prop-types
        const Profile = ({ user }) => <div>{user.firstName}</div>;
        const ProfileWithUser = withUser()(Profile);
        wrapper = shallow(<ProfileWithUser foo="bar" />);
        wrapperRender = shallow(
          wrapper.prop('children')({ user: { firstName: 'John' } })
        );
      });
      it('should render <Profile> with firstName', () => {
        expect(wrapperRender).toMatchElement(<div>{'John'}</div>);
      });
      it('should render FetchUser internally', () => {
        expect(wrapper).toRender('FetchUser');
      });
    });
  });

  describe('graphql query', () => {
    it('should match snapshot', () => {
      expect(LoggedInUserQuery).toMatchSnapshot();
    });
  });
});
