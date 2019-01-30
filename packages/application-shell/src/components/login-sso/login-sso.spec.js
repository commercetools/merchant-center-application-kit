import React from 'react';
import { shallow } from 'enzyme';
import { Formik } from 'formik';
import {
  ContentNotification,
  PrimaryButton,
  Text,
} from '@commercetools-frontend/ui-kit';
import { sessionStorage } from '@commercetools-frontend/storage';
import { ORGANIZATION_GENERAL_ERROR } from '../../constants';
import { LoginSSO, getMessageKeyForError } from './login-sso';

const createTestProps = props => ({
  match: {
    url: '/login/sso',
  },
  intl: {
    formatMessage: jest.fn(message => message.id),
  },
  getOrganizationByName: jest.fn(),
  ...props,
});

const createTestPropsForFormik = props => ({
  values: { organizationName: '' },
  errors: {},
  status: undefined,
  touched: {},
  isValid: false,
  handleSubmit: jest.fn(),
  isSubmitting: false,
  handleChange: () => {},
  setFieldValue: jest.fn(),
  setFieldTouched: jest.fn(),
  ...props,
});

jest.mock('uuid/v4', () => () => 'foo-uuid');
jest.mock('@commercetools-frontend/storage');

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    window.location.replace = jest.fn();
    props = createTestProps();
    wrapper = shallow(<LoginSSO {...props} />);
  });

  it('should render a LoginBox', () => {
    expect(wrapper).toRender('LoginBox');
  });
  it('should render <Formik>', () => {
    expect(wrapper).toRender(Formik);
  });
  describe('<Formik>', () => {
    it('should pass initial form values', () => {
      expect(wrapper.find(Formik)).toHaveProp('initialValues', {
        organizationName: '',
      });
    });
    describe('form elements', () => {
      let formikProps;
      let formikRenderWrapper;
      beforeEach(() => {
        formikProps = createTestPropsForFormik();
        formikRenderWrapper = shallow(
          wrapper.find(Formik).prop('render')(formikProps)
        );
      });
      it('should match layout', () => {
        expect(formikRenderWrapper).toMatchSnapshot();
      });
      it('should pass organizationName value to Field', () => {
        expect(
          formikRenderWrapper.find({ name: 'organizationName' })
        ).toHaveProp('value', '');
      });
      describe('general error message', () => {
        describe('when form status contains error message', () => {
          describe('when error message is matching the key ORGANIZATION_GENERAL_ERROR', () => {
            beforeEach(() => {
              formikProps = createTestPropsForFormik({
                status: { errorMessage: ORGANIZATION_GENERAL_ERROR },
              });
              formikRenderWrapper = shallow(
                wrapper.find(Formik).prop('render')(formikProps)
              );
            });
            it('should render <ContentNotification>', () => {
              expect(formikRenderWrapper).toRender(ContentNotification);
            });
            it('should render message with matching key', () => {
              expect(formikRenderWrapper).toRender({
                id: 'Login.sso.organizationGeneralError',
              });
            });
            it('should render secondary message with matching key', () => {
              expect(formikRenderWrapper).toRender({
                id: 'Login.sso.organizationGeneralErrorSecondary',
              });
            });
          });
          describe('when error message is not matching the key ORGANIZATION_GENERAL_ERROR', () => {
            beforeEach(() => {
              formikProps = createTestPropsForFormik({
                status: { errorMessage: 'Some other error' },
              });
              formikRenderWrapper = shallow(
                wrapper.find(Formik).prop('render')(formikProps)
              );
            });
            it('should render <ContentNotification>', () => {
              expect(formikRenderWrapper).toRender(ContentNotification);
            });
            it('should render error message as-is', () => {
              expect(formikRenderWrapper).toContainReact(
                <Text.Body>{'Some other error'}</Text.Body>
              );
            });
            it('should not render secondary message', () => {
              expect(formikRenderWrapper).not.toRender({
                id: 'Login.sso.organizationGeneralErrorSecondary',
              });
            });
          });
        });
      });
      describe('submit button', () => {
        describe('when form is valid', () => {
          describe('when form is submitting', () => {
            beforeEach(() => {
              formikProps = createTestPropsForFormik({
                isValid: true,
                isSubmitting: true,
              });
              formikRenderWrapper = shallow(
                wrapper.find(Formik).prop('render')(formikProps)
              );
            });
            it('should disable button', () => {
              expect(formikRenderWrapper.find(PrimaryButton)).toHaveProp(
                'isDisabled',
                true
              );
            });
          });
          describe('when form is not submitting', () => {
            beforeEach(() => {
              formikProps = createTestPropsForFormik({
                isValid: true,
                isSubmitting: false,
              });
              formikRenderWrapper = shallow(
                wrapper.find(Formik).prop('render')(formikProps)
              );
            });
            it('should enable button', () => {
              expect(formikRenderWrapper.find(PrimaryButton)).toHaveProp(
                'isDisabled',
                false
              );
            });
          });
        });
      });
    });
  });
});

describe('interaction', () => {
  let wrapper;
  let props;
  describe('submitting the form', () => {
    const formActions = { setSubmitting: jest.fn(), setStatus: jest.fn() };
    describe('when request is successful', () => {
      describe('when authProvider protocol is "oidc"', () => {
        beforeEach(() => {
          props = createTestProps({
            getOrganizationByName: jest.fn(() =>
              Promise.resolve({
                authorizeUrl: 'https://auth0.ct.com/authorize',
                organizationId: 'o1',
                clientId: '123',
              })
            ),
          });
          wrapper = shallow(<LoginSSO {...props} />);
          wrapper
            .instance()
            .handleSubmit({ organizationName: 'commercetools' }, formActions);
        });
        it('should reset submitting state', () => {
          expect(formActions.setSubmitting).toHaveBeenCalledWith(false);
        });
        it('should pass organization name to getOrganizationByName', () => {
          expect(props.getOrganizationByName).toHaveBeenCalledWith(
            'commercetools'
          );
        });
        it('should build authorize URL', () => {
          expect(window.location.replace).toHaveBeenCalledWith(
            expect.stringContaining('https://auth0.ct.com/authorize')
          );
        });
        it('should build authorize URL with scope param', () => {
          expect(window.location.replace).toHaveBeenCalledWith(
            expect.stringContaining(
              `scope=${encodeURIComponent('openid email profile')}`
            )
          );
        });
        it('should build authorize URL with response_type param', () => {
          expect(window.location.replace).toHaveBeenCalledWith(
            expect.stringContaining('response_type=id_token')
          );
        });
        it('should build authorize URL with client_id param', () => {
          expect(window.location.replace).toHaveBeenCalledWith(
            expect.stringContaining('client_id=123')
          );
        });
        it('should save state in nonce', () => {
          expect(sessionStorage.put).toHaveBeenCalledWith(
            expect.stringContaining('nonce_foo-uuid'),
            JSON.stringify({ organizationId: 'o1' })
          );
        });
        it('should build authorize URL with nonce param', () => {
          expect(window.location.replace).toHaveBeenCalledWith(
            expect.stringContaining('nonce=foo-uuid')
          );
        });
      });
    });
    describe('when request fails', () => {
      describe('when status code is 404', () => {
        beforeEach(() => {
          props = createTestProps({
            getOrganizationByName: jest.fn(() => {
              const error = new Error('Oops');
              error.statusCode = 404;
              return Promise.reject(error);
            }),
          });
          wrapper = shallow(<LoginSSO {...props} />);
          wrapper
            .instance()
            .handleSubmit({ organizationName: 'commercetools' }, formActions);
        });
        it('should reset submitting state', () => {
          expect(formActions.setSubmitting).toHaveBeenCalledWith(false);
        });
        it('should set form status with error message', () => {
          expect(formActions.setStatus).toHaveBeenCalledWith({
            errorMessage: ORGANIZATION_GENERAL_ERROR,
          });
        });
      });
      describe('when status code is not 404', () => {
        beforeEach(() => {
          props = createTestProps({
            getOrganizationByName: jest.fn(() => {
              const error = new Error('Oops');
              error.statusCode = 400;
              return Promise.reject(error);
            }),
          });
          wrapper = shallow(<LoginSSO {...props} />);
          wrapper
            .instance()
            .handleSubmit({ organizationName: 'commercetools' }, formActions);
        });
        it('should reset submitting state', () => {
          expect(formActions.setSubmitting).toHaveBeenCalledWith(false);
        });
        it('should set form status with error message', () => {
          expect(formActions.setStatus).toHaveBeenCalledWith({
            errorMessage: 'Oops',
          });
        });
      });
    });
  });
});

describe('getMessageKeyForError', () => {
  describe('ORGANIZATION_GENERAL_ERROR error', () => {
    it('should map to organizationGeneralError', () => {
      expect(getMessageKeyForError(ORGANIZATION_GENERAL_ERROR)).toBe(
        'organizationGeneralError'
      );
    });
  });
});
