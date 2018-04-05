import React from 'react';
import { shallow } from 'enzyme';
import { intlMock } from '@commercetools-local/test-utils';
import { UserProfileGeneralInfoSubform } from './user-profile-general-info-subform';

const createFormikProps = props => ({
  isSubmitting: false,
  values: {
    email: 'john@snow.got',
    firstName: 'John',
    lastName: 'Snow',
  },
  errors: {},
  touched: {},
  handleChange: jest.fn(),

  ...props,
});
const createTestProps = props => ({
  formik: createFormikProps(),

  intl: intlMock,

  ...props,
});

describe('rendering', () => {
  describe('when there are no errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<UserProfileGeneralInfoSubform {...props} />);
    });
    it('should ensure layout structure', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render input field for firstName', () => {
      expect(wrapper).toRender({ name: 'firstName' });
    });
    it('should render input field for lastName', () => {
      expect(wrapper).toRender({ name: 'lastName' });
    });
    it('should render input field for email', () => {
      expect(wrapper).toRender({ name: 'email' });
    });
  });

  describe('when submitting', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        formik: createFormikProps({
          isSubmitting: true,
        }),
      });
      wrapper = shallow(<UserProfileGeneralInfoSubform {...props} />);
    });
    it('should disable all input fields', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should disable the first name input', () => {
      expect(wrapper.find({ name: 'firstName' })).toHaveProp(
        'isDisabled',
        true
      );
    });
  });
});
