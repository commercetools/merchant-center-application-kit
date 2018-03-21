import React from 'react';
import { shallow } from 'enzyme';
import { intlMock } from '@commercetools-local/test-utils';
import WarningSaveToolbar from '@commercetools-local/core/components/warning-save-toolbar';
import UserProfileGeneralInfoPanel from '../user-profile-general-info-panel';
import { UserProfileForm, validate } from './user-profile-form';

const createTestProps = props => ({
  initialValues: {
    version: 2,
    email: 'john@snow.got',
    firstName: 'John',
    lastName: 'Snow',
    language: 'en',
    timeZone: 'Europe/Berlin',
  },
  onSubmit: jest.fn(),
  intl: intlMock,
  ...props,
});

const createFormikProps = props => ({
  values: {
    version: 2,
    email: 'john@snow.got',
    firstName: 'John',
    lastName: 'Snow',
    language: 'en',
    timeZone: 'Europe/Berlin',
  },
  errors: {},
  touched: {},
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  isSubmitting: false,
  setFieldValue: jest.fn(),
  setFieldTouched: jest.fn(),
  resetForm: jest.fn(),
  dirty: false,
  ...props,
});

describe('validate', () => {
  describe('when the first name is missing', () => {
    it('should mark that as an error', () => {
      expect(validate({ firstName: '', lastName: 'Foo' })).toEqual({
        firstNameMissing: true,
      });
    });
  });
  describe('when the last name is missing', () => {
    it('should mark that as an error', () => {
      expect(validate({ firstName: 'Foo', lastName: '' })).toEqual({
        lastNameMissing: true,
      });
    });
  });
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<UserProfileForm {...props} />);
  });
  it('should ensure layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('rendering form', () => {
    let formikProps;
    let formikWrapper;
    beforeEach(() => {
      formikProps = createFormikProps();
      formikWrapper = shallow(
        wrapper.find('Formik').prop('render')(formikProps)
      );
    });
    it('should render <UserProfileGeneralInfoPanel>', () => {
      expect(formikWrapper).toRender(UserProfileGeneralInfoPanel);
    });
  });
  describe('<WarningSaveToolbar>', () => {
    describe('when form is pristine', () => {
      let formikProps;
      let formikWrapper;
      beforeEach(() => {
        formikProps = createFormikProps({ touched: {}, dirty: false });
        formikWrapper = shallow(
          wrapper.find('Formik').prop('render')(formikProps)
        );
      });
      it('should not warn on leave', () => {
        expect(formikWrapper.find(WarningSaveToolbar)).toHaveProp(
          'shouldWarnOnLeave',
          false
        );
      });
      it('should not show save toolbar', () => {
        expect(formikWrapper.find(WarningSaveToolbar)).toHaveProp(
          'isToolbarVisible',
          false
        );
      });
    });
    describe('when form is dirty', () => {
      let formikProps;
      let formikWrapper;
      beforeEach(() => {
        formikProps = createFormikProps({
          touched: { name: true },
          dirty: true,
        });
        formikWrapper = shallow(
          wrapper.find('Formik').prop('render')(formikProps)
        );
      });
      it('should warn on leave', () => {
        expect(formikWrapper.find(WarningSaveToolbar)).toHaveProp(
          'shouldWarnOnLeave',
          true
        );
      });
      it('should show save toolbar', () => {
        expect(formikWrapper.find(WarningSaveToolbar)).toHaveProp(
          'isToolbarVisible',
          true
        );
      });
    });
    describe('when form is submitting', () => {
      let formikProps;
      let formikWrapper;
      beforeEach(() => {
        formikProps = createFormikProps({
          touched: { firstName: true },
          dirty: true,
          isSubmitting: true,
        });
        formikWrapper = shallow(
          wrapper.find('Formik').prop('render')(formikProps)
        );
      });
      it('should disable SaveToolbar', () => {
        expect(formikWrapper.find(WarningSaveToolbar)).toHaveProp(
          'isToolbarDisabled',
          true
        );
      });
    });
    describe('when firstname is invalid', () => {
      let formikProps;
      let formikWrapper;
      beforeEach(() => {
        formikProps = createFormikProps({
          errors: { firstName: 'foo' },
          touched: { firstName: true },
          dirty: true,
        });
        formikWrapper = shallow(
          wrapper.find('Formik').prop('render')(formikProps)
        );
      });
      it('should show the error', () => {
        expect(formikWrapper.find(UserProfileGeneralInfoPanel)).toHaveProp(
          'errors',
          { firstName: 'foo' }
        );
      });
      it('should not disable SaveToolbar', () => {
        expect(formikWrapper.find(WarningSaveToolbar)).toHaveProp(
          'isToolbarDisabled',
          false
        );
      });
    });
  });
});
