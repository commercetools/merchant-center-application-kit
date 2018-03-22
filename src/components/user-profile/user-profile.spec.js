import React from 'react';
import { shallow } from 'enzyme';
import { GRAPHQL_TARGETS, DOMAINS } from '@commercetools-local/constants';
import { intlMock } from '@commercetools-local/test-utils';
import UserProfileForm from '../user-profile-form';
import { UserProfile } from './user-profile';

const createTestProps = props => ({
  route: {},
  user: {
    firstName: 'foo',
    lastName: 'bar',
    email: 'foo@bar.com',
  },
  projectsCount: 2,
  organizationsCount: 1,
  updateUserProfile: jest.fn(),
  showNotification: jest.fn(),
  showApiErrorNotification: jest.fn(),
  intl: intlMock,
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<UserProfile {...props} />);
  });
  it('should ensure layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render <Avatar>', () => {
    expect(wrapper).toRender('Avatar');
  });
  it('should render <TextHeadline>', () => {
    expect(wrapper).toRender('TextHeadline');
  });
  it('should render <TextBody>', () => {
    expect(wrapper).toRender('TextBody');
  });
  it('should render <TextBody> message', () => {
    expect(wrapper.find('TextBody')).toRender({ id: 'UserProfile.subtitle' });
  });
  it('should pass values to <TextBody> message', () => {
    expect(wrapper.find('TextBody')).toRender({
      values: { organizationsCount: 1, projectsCount: 2 },
    });
  });
  describe('<UserProfileForm>', () => {
    it('should pass initialValues to <UserProfileForm>', () => {
      expect(wrapper.find(UserProfileForm)).toHaveProp(
        'initialValues',
        props.user
      );
    });
  });
});

describe('callbacks', () => {
  describe('handleSubmit', () => {
    let props;
    let wrapper;
    let formikBag;
    describe('when request is successfull', () => {
      beforeEach(() => {
        formikBag = {
          setSubmitting: jest.fn(),
          resetForm: jest.fn(),
        };
        props = createTestProps({
          updateUserProfile: jest.fn(() =>
            Promise.resolve({
              data: {
                updateUserProfile: {
                  id: '1',
                  version: 2,
                  email: 'john@snow.got',
                  firstName: 'John',
                  lastName: 'Snow',
                  language: 'en',
                  timeZone: 'Europe/Berlin',
                },
              },
            })
          ),
        });
        wrapper = shallow(<UserProfile {...props} />);
        return wrapper.instance().handleSubmit(
          {
            version: 2,
            firstName: 'John',
            lastName: 'Snow',
            language: 'en',
            timeZone: 'Europe/Berlin',
          },
          formikBag
        );
      });
      it('should trigger mutation', () => {
        expect(props.updateUserProfile).toHaveBeenCalledTimes(1);
        expect(props.updateUserProfile).toHaveBeenCalledWith({
          variables: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            version: 2,
            user: {
              firstName: 'John',
              lastName: 'Snow',
              language: 'en',
              timeZone: 'Europe/Berlin',
            },
          },
        });
      });
      it('should dispatch success notification', () => {
        expect(props.showNotification).toHaveBeenCalledTimes(1);
        expect(props.showNotification).toHaveBeenCalledWith({
          kind: 'success',
          domain: DOMAINS.SIDE,
          text: 'UserProfile.userUpdated',
        });
      });
      it('should reset form values', () => {
        expect(formikBag.resetForm).toHaveBeenCalled();
      });
      it('should mark form as not submitting', () => {
        expect(formikBag.setSubmitting).toHaveBeenCalledWith(false);
      });
    });
    describe('when request fails', () => {
      beforeEach(() => {
        formikBag = {
          setSubmitting: jest.fn(),
          setErrors: jest.fn(),
        };
        props = createTestProps({
          updateUserProfile: jest.fn(() => Promise.reject(new Error('Oops'))),
        });
        wrapper = shallow(<UserProfile {...props} />);
        return wrapper.instance().handleSubmit(
          {
            version: 2,
            firstName: 'John',
            lastName: 'Snow',
            language: 'en',
            timeZone: 'Europe/Berlin',
          },
          formikBag
        );
      });
      it('should trigger mutation', () => {
        expect(props.updateUserProfile).toHaveBeenCalledTimes(1);
        expect(props.updateUserProfile).toHaveBeenCalledWith({
          variables: {
            target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
            version: 2,
            user: {
              firstName: 'John',
              lastName: 'Snow',
              language: 'en',
              timeZone: 'Europe/Berlin',
            },
          },
        });
      });
      it('should not dispatch success notification', () => {
        expect(props.showNotification).toHaveBeenCalledTimes(0);
      });
      it('should mark form as not submitting', () => {
        expect(formikBag.setSubmitting).toHaveBeenCalledWith(false);
      });
    });
  });
});
