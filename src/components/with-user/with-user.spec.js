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
          render: jest.fn(),
          // this is usually injected by graphql
          userData: {
            loading: false,
            me: {
              firstName: 'John',
            },
          },
        };
        wrapper = shallow(<WithUser foo="bar" {...props} />);
      });
      it('should call render with userData object', () => {
        expect(props.render).toHaveBeenCalledWith(
          expect.objectContaining({ userData: props.userData })
        );
      });
      it('should proxy parent props to render', () => {
        expect(props.render).toHaveBeenCalledWith(
          expect.objectContaining({ foo: 'bar' })
        );
      });
    });
    describe('when mapDataToProps is defined', () => {
      beforeEach(() => {
        props = {
          mapDataToProps: userData => ({
            firstName: userData.me && userData.me.firstName,
          }),
          render: jest.fn(),
          // this is usually injected by graphql
          userData: {
            loading: false,
            me: {
              firstName: 'John',
            },
          },
        };
        wrapper = shallow(<WithUser foo="bar" {...props} />);
      });
      it('should call render with mapped prop firstName', () => {
        expect(props.render).toHaveBeenCalledWith(
          expect.objectContaining({ firstName: 'John' })
        );
      });
      it('should call render without userData object', () => {
        expect(props.render).not.toHaveBeenCalledWith(
          expect.objectContaining({ userData: props.userData })
        );
      });
      it('should proxy parent props to render', () => {
        expect(props.render).toHaveBeenCalledWith(
          expect.objectContaining({ foo: 'bar' })
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
      wrapperRender = shallow(wrapper.prop('render')({ firstName: 'John' }));
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
