import { shallow } from 'enzyme';
import React from 'react';
import { LOGOUT_REASONS } from '@commercetools-local/constants';
import { Login } from './login';

jest.mock('@commercetools-local/utils/storage');

const createTestProps = props => ({
  location: {
    // Can contain following params:
    // - `reason`
    // - `redirectTo`
    search: '',
  },
  history: {
    push: jest.fn(),
  },
  // Action creators
  requestAccessToken: jest.fn(),
  // Injected
  adminCenterUrl: 'http://ac.com',
  intl: {
    formatMessage: jest.fn(message => message.id),
  },
  ...props,
});

const handleSubmitPreventDefaultMock = jest.fn();
const forgotPasswordPreventDefaultMock = jest.fn();

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    const props = createTestProps();
    wrapper = shallow(<Login {...props} />);
  });

  it('should render a <LoginBox>', () => {
    expect(wrapper).toRender('LoginBox');
  });

  it('should render a <form> with method "post"', () => {
    expect(wrapper).toRender('form');
    expect(wrapper.find('form')).toHaveProp('method', 'post');
  });

  it('should render form title', () => {
    expect(wrapper).toRender({ id: 'LoginForm.title' });
  });

  it('should render email label', () => {
    expect(wrapper).toRender({ id: 'LoginForm.email' });
  });

  it('should render password label', () => {
    expect(wrapper).toRender({ id: 'LoginForm.password' });
  });

  it('should render forgot password label', () => {
    expect(wrapper).toRender({ id: 'LoginForm.forgotPassword' });
  });

  it('should render a <PrimaryButton>', () => {
    expect(wrapper).toRender('PrimaryButton');
  });

  it('should match tree', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('error message', () => {
    let errorMessageWrapper;
    describe('when there is no error message set', () => {
      beforeEach(() => {
        const props = createTestProps();
        wrapper = shallow(<Login {...props} />);
        wrapper.setState({ error: null });
        const ErrorMessage = wrapper.instance().renderErrorMessage;
        errorMessageWrapper = shallow(<ErrorMessage />);
      });
      it('should render nothing', () => {
        expect(errorMessageWrapper.type()).toBe(null);
      });
    });
    describe('when the error message matches "no-project"', () => {
      beforeEach(() => {
        const props = createTestProps();
        wrapper = shallow(<Login {...props} />);
        wrapper.setState({ error: LOGOUT_REASONS.NO_PROJECTS });
        const ErrorMessage = wrapper.instance().renderErrorMessage;
        errorMessageWrapper = shallow(<ErrorMessage />);
      });
      it('should render <Notification>', () => {
        expect(errorMessageWrapper).toRender('Notification');
      });
      it('should pass message id', () => {
        expect(errorMessageWrapper.find('FormattedMessage')).toHaveProp(
          'id',
          'LoginForm.noProjectsTitle'
        );
      });
      describe('message link', () => {
        beforeEach(() => {
          errorMessageWrapper = shallow(
            errorMessageWrapper.find('FormattedMessage').prop('values').link
          );
        });
        it('should pass url to link', () => {
          expect(errorMessageWrapper.find('a')).toHaveProp(
            'href',
            'http://ac.com/login'
          );
        });
        it('should pass message to link', () => {
          expect(errorMessageWrapper.find('FormattedMessage')).toHaveProp(
            'id',
            'LoginForm.noProjectsLink'
          );
        });
      });
    });
    describe('when the error message matches "user"', () => {
      beforeEach(() => {
        const props = createTestProps();
        wrapper = shallow(<Login {...props} />);
        wrapper.setState({ error: LOGOUT_REASONS.USER });
        const ErrorMessage = wrapper.instance().renderErrorMessage;
        errorMessageWrapper = shallow(<ErrorMessage />);
      });
      it('should render <Notification>', () => {
        expect(errorMessageWrapper).toRender('Notification');
      });
      it('should pass message id', () => {
        expect(errorMessageWrapper.find('FormattedMessage')).toHaveProp(
          'id',
          'LoginForm.logout'
        );
      });
    });
    describe('when the error message matches "unauthorized"', () => {
      beforeEach(() => {
        const props = createTestProps();
        wrapper = shallow(<Login {...props} />);
        wrapper.setState({ error: LOGOUT_REASONS.UNAUTHORIZED });
        const ErrorMessage = wrapper.instance().renderErrorMessage;
        errorMessageWrapper = shallow(<ErrorMessage />);
      });
      it('should render <Notification>', () => {
        expect(errorMessageWrapper).toRender('Notification');
      });
      it('should pass message id', () => {
        expect(errorMessageWrapper.find('FormattedMessage')).toHaveProp(
          'id',
          'LoginForm.unauthorized'
        );
      });
    });
    describe('when the error message matches "invalid"', () => {
      beforeEach(() => {
        const props = createTestProps();
        wrapper = shallow(<Login {...props} />);
        wrapper.setState({ error: LOGOUT_REASONS.INVALID });
        const ErrorMessage = wrapper.instance().renderErrorMessage;
        errorMessageWrapper = shallow(<ErrorMessage />);
      });
      it('should render <Notification>', () => {
        expect(errorMessageWrapper).toRender('Notification');
      });
      it('should pass message id', () => {
        expect(errorMessageWrapper.find('FormattedMessage')).toHaveProp(
          'id',
          'LoginForm.InvalidCredentials'
        );
      });
    });
  });
});

describe('initial state', () => {
  let wrapper;
  beforeEach(() => {
    const props = createTestProps({
      location: { search: '?reason=foo' },
    });
    wrapper = shallow(<Login {...props} />);
  });
  it('should have matching initial state', () => {
    expect(wrapper.state()).toEqual({
      loading: false,
      email: null,
      password: null,
      countdown: 10,
      showRedirectDialog: null,
      shouldRedirectPasswordForgot: false,
      error: 'foo',
    });
  });
});

describe('requestAccessToken', () => {
  describe('without redirectTo parameter', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      handleSubmitPreventDefaultMock.mockClear();
      props = createTestProps({
        requestAccessToken: jest.fn(() =>
          Promise.resolve({ body: { token: '123' } })
        ),
      });
      wrapper = shallow(<Login {...props} />);
      wrapper.setState({ email: 'john@doe.com', password: 'secret' });
      wrapper.find('form').simulate('change', {
        target: {
          name: 'email',
          value: 'john@doe.com',
        },
      });
      wrapper.find('form').simulate('change', {
        target: {
          name: 'password',
          value: 'secret',
        },
      });
      wrapper
        .find('PrimaryButton')
        .simulate('click', { preventDefault: handleSubmitPreventDefaultMock });
    });
    it('preventDefault should be called', () => {
      expect(handleSubmitPreventDefaultMock).toHaveBeenCalledTimes(1);
    });
    describe('when enter is pressed', () => {
      const keyDownEvent = { preventDefault: jest.fn(), keyCode: 13 };
      beforeEach(() => {
        wrapper
          .find('input')
          .at(1)
          .simulate('keyDown', keyDownEvent);
      });
      it('should call the submit method', () => {
        expect(keyDownEvent.preventDefault).toHaveBeenCalledTimes(1);
      });
    });
    it('should pass login options to action creator', () => {
      expect(props.requestAccessToken).toHaveBeenLastCalledWith({
        email: 'john@doe.com',
        password: 'secret',
      });
    });
    it('should redirect to root path', () => {
      expect(props.history.push).toHaveBeenLastCalledWith('/');
    });
    it('should set loading to false', () => {
      expect(wrapper).toHaveState('loading', false);
    });
  });
  describe('with redirectTo parameter', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      handleSubmitPreventDefaultMock.mockClear();
      props = createTestProps({
        location: {
          search: '?redirectTo=/foo/bar',
        },
        requestAccessToken: jest.fn(() =>
          Promise.resolve({ body: { token: '123' } })
        ),
      });
      wrapper = shallow(<Login {...props} />);
      wrapper.setState({ email: 'john@doe.com', password: 'secret' });
      wrapper.find('form').simulate('change', {
        target: {
          name: 'email',
          value: 'john@doe.com',
        },
      });
      wrapper.find('form').simulate('change', {
        target: {
          name: 'password',
          value: 'secret',
        },
      });
      wrapper
        .find('PrimaryButton')
        .simulate('click', { preventDefault: handleSubmitPreventDefaultMock });
    });
    it('should call preventDefault', () => {
      expect(handleSubmitPreventDefaultMock).toHaveBeenCalledTimes(1);
    });
    it('should pass login options to action creator', () => {
      expect(props.requestAccessToken).toHaveBeenLastCalledWith({
        email: 'john@doe.com',
        password: 'secret',
      });
    });
    it('should redirect to given path', () => {
      expect(props.history.push).toHaveBeenLastCalledWith('/foo/bar');
    });
    it('should set loading to false', () => {
      expect(wrapper).toHaveState('loading', false);
    });
  });
  describe('when login fails', () => {
    describe('when error message matches "invalid"', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        handleSubmitPreventDefaultMock.mockClear();
        props = createTestProps({
          requestAccessToken: jest.fn(() => {
            const error = new Error('Username or password are invalid');
            return Promise.reject(error);
          }),
        });
        wrapper = shallow(<Login {...props} />);
        wrapper.setState({ email: 'john@doe.com', password: 'secret' });
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
      });
      it('should set INVALID reason as error message', () => {
        expect(wrapper).toHaveState('error', 'invalid');
      });
    });
    describe('when error message does not match "invalid"', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        handleSubmitPreventDefaultMock.mockClear();
        props = createTestProps({
          requestAccessToken: jest.fn(() => {
            const error = new Error('Fetch error');
            return Promise.reject(error);
          }),
        });
        wrapper = shallow(<Login {...props} />);
        wrapper.setState({ email: 'john@doe.com', password: 'secret' });
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
      });
      it('should set original error message as error', () => {
        expect(wrapper).toHaveState('error', 'Fetch error');
      });
    });
  });
});

describe('ForgotPassword', () => {
  describe('when login is not loading', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<Login {...props} />);
    });
    describe('when clicking "forgot password"', () => {
      beforeEach(() => {
        forgotPasswordPreventDefaultMock.mockClear();
        const clickEvent = { preventDefault: forgotPasswordPreventDefaultMock };
        wrapper.find('a').simulate('click', clickEvent);
      });
      it('preventDefault should be called', () => {
        expect(forgotPasswordPreventDefaultMock).toHaveBeenCalledTimes(1);
      });
      it('should allow redirect', () => {
        expect(wrapper.state('shouldRedirectPasswordForgot')).toBe(true);
      });
    });
  });
  describe('when login is loading', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<Login {...props} />);
      wrapper.setState({ loading: true });
    });
    describe('when clicking "forgot password"', () => {
      beforeEach(() => {
        forgotPasswordPreventDefaultMock.mockClear();
        const clickEvent = { preventDefault: forgotPasswordPreventDefaultMock };
        wrapper.find('a').simulate('click', clickEvent);
      });
      it('preventDefault should not be called', () => {
        expect(forgotPasswordPreventDefaultMock).toHaveBeenCalledTimes(0);
      });
      it('should not allow redirects', () => {
        expect(wrapper.state('shouldRedirectPasswordForgot')).toBe(false);
      });
    });
  });
});
