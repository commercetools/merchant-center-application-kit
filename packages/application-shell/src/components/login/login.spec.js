import { shallow } from 'enzyme';
import React from 'react';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { renderWithRedux, waitForElement, fireEvent } from '../../test-utils';
import { Login } from './login';

jest.mock('@commercetools-frontend/storage');

const createTestProps = props => ({
  location: { query: {} },
  history: {
    push: jest.fn(),
  },
  // Action creators
  requestAccessToken: jest.fn(),
  // Injected
  adminCenterUrl: 'http://ac.com',
  redirectTo: jest.fn(),
  intl: {
    formatMessage: jest.fn(message => message.id),
  },
  ...props,
});

const handleSubmitPreventDefaultMock = jest.fn();

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
      location: { query: { reason: 'foo' } },
    });
    wrapper = shallow(<Login {...props} />);
  });
  it('should have matching initial state', () => {
    expect(wrapper.state()).toEqual({
      loading: false,
      email: null,
      password: null,
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
        requestAccessToken: jest.fn(() => Promise.resolve()),
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
      expect(props.redirectTo).toHaveBeenLastCalledWith(
        'https://mc.commercetools.com'
      );
    });
    it('should set loading to false', () => {
      expect(wrapper).toHaveState('loading', false);
    });
  });
  describe('with redirectTo parameter', () => {
    let props;
    let wrapper;
    const simulateRedirectFor = targetUrl => {
      handleSubmitPreventDefaultMock.mockClear();
      props = createTestProps({
        location: { query: { redirectTo: targetUrl } },
        requestAccessToken: jest.fn(() => Promise.resolve()),
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
    };
    beforeEach(() => {
      simulateRedirectFor('https://mc.commercetools.com/foo/bar');
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
    it('should set loading to false', () => {
      expect(wrapper).toHaveState('loading', false);
    });
    describe('when target url is malformed', () => {
      beforeEach(() => {
        simulateRedirectFor('/foo/bar'); // <-- missing origin, parsing it will throw
      });
      it('should redirect to default path', () => {
        expect(props.redirectTo).toHaveBeenLastCalledWith(
          'https://mc.commercetools.com'
        );
      });
    });
    describe('when target url does not match origin', () => {
      beforeEach(() => {
        simulateRedirectFor('https://foo.com/foo/bar');
      });
      it('should redirect to default path', () => {
        expect(props.redirectTo).toHaveBeenLastCalledWith(
          'https://mc.commercetools.com'
        );
      });
    });
    describe('when target url matches current origin', () => {
      beforeEach(() => {
        simulateRedirectFor('https://mc.commercetools.com/foo/bar');
      });
      it('should redirect to default path', () => {
        expect(props.redirectTo).toHaveBeenLastCalledWith(
          'https://mc.commercetools.com/foo/bar'
        );
      });
    });
  });
  describe('when login fails', () => {
    describe('when error code is "LockedAccount"', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        handleSubmitPreventDefaultMock.mockClear();
        props = createTestProps({
          requestAccessToken: jest.fn(() => {
            const error = new Error('Account is locked');
            error.errors = [{ code: 'LockedAccount' }];
            return Promise.reject(error);
          }),
        });
        wrapper = shallow(<Login {...props} />);
        wrapper.setState({ email: 'john@doe.com', password: 'secret' });
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
      });
      it('should redirect to locked page', () => {
        expect(props.history.push).toHaveBeenCalledWith('/login/locked');
      });
    });
    describe('when error code is not "LockedAccount"', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        handleSubmitPreventDefaultMock.mockClear();
        props = createTestProps({
          requestAccessToken: jest.fn(() => {
            const error = new Error('Username or password are invalid');
            error.body = { errors: [{ code: 'InvalidLogin' }] };
            return Promise.reject(error);
          }),
        });
        wrapper = shallow(<Login {...props} />);
        wrapper.setState({ email: 'john@doe.com', password: 'secret' });
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
      });
      it('should set INVALID reason as error message', () => {
        expect(wrapper).toHaveState('error', LOGOUT_REASONS.INVALID);
      });
    });
  });
});

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

/* New tests with react-testing-library */
describe('reset password flow', () => {
  it('should open a dialog and redirect to the AC', async () => {
    const props = createTestProps();
    const { getByText } = renderWithRedux(<Login {...props} />);

    await waitForElement(() => getByText(/Sign in to your account/));

    fireEvent.click(getByText(/Forgot password/));

    await waitForElement(() =>
      getByText(
        /We are redirecting you to the Forgot Password form in 3 seconds/
      )
    );

    await delay(4000); // the countdown is 3 secods, we wait a bit more just to be sure

    expect(props.redirectTo).toHaveBeenCalledWith(
      `${props.adminCenterUrl}/reset-password`
    );
  });
});
