import React from 'react';
import { shallow } from 'enzyme';
import { WithUser, withUser, LoggedInUserQuery } from './with-user';

describe('rendering', () => {
  let props;
  let wrapper;

  describe('<WithUser>', () => {
    describe('when mapDataToProps is not defined', () => {
      beforeEach(() => {
        props = {
          children: jest.fn(),
          // this is usually injected by graphql
          userData: {
            loading: false,
            me: {
              firstName: 'John',
            },
          },
        };
        wrapper = shallow(<WithUser {...props} />);
      });
      it('should call children with userData object', () => {
        expect(props.children).toHaveBeenCalledWith(props.userData);
      });
    });
    describe('when mapDataToProps is defined', () => {
      beforeEach(() => {
        props = {
          mapDataToProps: userData => ({
            firstName: userData.me && userData.me.firstName,
          }),
          children: jest.fn(),
          // this is usually injected by graphql
          userData: {
            loading: false,
            me: {
              firstName: 'John',
            },
          },
        };
        wrapper = shallow(<WithUser {...props} />);
      });
      it('should call children with mapped prop firstName', () => {
        expect(props.children).toHaveBeenCalledWith(
          expect.objectContaining({ firstName: 'John' })
        );
      });
      it('should call children without userData object', () => {
        expect(props.children).not.toHaveBeenCalledWith(
          expect.objectContaining(props.userData)
        );
      });
    });
  });

  describe('withUser()', () => {
    let wrapperRender;
    // eslint-disable-next-line react/prop-types
    const Profile = ({ firstName }) => <div>{firstName}</div>;

    beforeEach(() => {
      const ProfileWithUser = withUser()(Profile);
      wrapper = shallow(<ProfileWithUser foo="bar" />);
      wrapperRender = shallow(wrapper.prop('children')({ firstName: 'John' }));
    });
    it('should render <Profile> with firstName', () => {
      expect(wrapperRender).toMatchElement(<div>{'John'}</div>);
    });
    it('should render WithUser internally', () => {
      expect(wrapper).toRender('WithUser');
    });
  });

  describe('graphql query', () => {
    it('should match snapshot', () => {
      expect(LoggedInUserQuery).toMatchSnapshot();
    });
  });
});
