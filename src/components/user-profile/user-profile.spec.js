import React from 'react';
import { shallow } from 'enzyme';
import { SubmissionError } from 'redux-form';
import { DOMAINS } from '@commercetools-local/constants';
import UserProfileForm from '../user-profile-form';
import { UserProfile } from './user-profile';

// TODO replace with test-utils intlMock after RR4 migration #RR4
const intlMock = {
  formatMessage: message => message.id,
  formatDate: () => 'xxx',
  formatTime: () => 'xxx',
  formatRelative: () => 'xxx',
  formatNumber: () => 'xxx',
  formatPlural: () => 'xxx',
  formatHTMLMessage: () => 'xxx',
  now: () => 'xxx',
};

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
  setLoggedInUser: jest.fn(),
  showNotification: jest.fn(),
  showUnexpectedErrorNotification: jest.fn(),
  intl: intlMock,
  env: 'production',
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
    it('should pass route to <UserProfileForm>', () => {
      expect(wrapper.find(UserProfileForm)).toHaveProp('route', props.route);
    });
  });
});

describe('callbacks', () => {
  describe('handleSave', () => {
    let props;
    let wrapper;
    describe('if request is successfull', () => {
      beforeEach(async () => {
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
        return wrapper.instance().handleSave({
          version: 2,
          firstName: 'John',
          lastName: 'Snow',
          language: 'en',
          timeZone: 'Europe/Berlin',
        });
      });
      it('should trigger mutation', () => {
        expect(props.updateUserProfile).toHaveBeenCalledTimes(1);
        expect(props.updateUserProfile).toHaveBeenCalledWith({
          variables: {
            target: 'mc',
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
    });
    describe('if request failed', () => {
      beforeEach(() => {
        props = createTestProps({
          updateUserProfile: jest.fn(() => Promise.reject(new Error('Oops'))),
        });
        wrapper = shallow(<UserProfile {...props} />);
        return wrapper
          .instance()
          .handleSave({
            version: 2,
            firstName: 'John',
            lastName: 'Snow',
            language: 'en',
            timeZone: 'Europe/Berlin',
          })
          .catch(() => {});
      });
      it('should trigger mutation', () => {
        expect(props.updateUserProfile).toHaveBeenCalledTimes(1);
        expect(props.updateUserProfile).toHaveBeenCalledWith({
          variables: {
            target: 'mc',
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
      it('should not dispatch update user', () => {
        expect(props.setLoggedInUser).toHaveBeenCalledTimes(0);
      });
      it('should not dispatch success notification', () => {
        expect(props.showNotification).toHaveBeenCalledTimes(0);
      });
      it('should dispatch error notification', () => {
        expect(props.showUnexpectedErrorNotification).toHaveBeenCalledTimes(1);
        expect(props.showUnexpectedErrorNotification).toHaveBeenCalledWith({
          error: new Error('Oops'),
        });
      });
      it('should reject with a SubmissionError', () => {
        expect(
          wrapper.instance().handleSave({
            version: 2,
            firstName: 'John',
            lastName: 'Snow',
            language: 'en',
            timeZone: 'Europe/Berlin',
          })
        ).rejects.toThrow(SubmissionError);
      });
    });
  });
});
