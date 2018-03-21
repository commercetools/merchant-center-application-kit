import React from 'react';
import { shallow } from 'enzyme';
import { intlMock } from '@commercetools-local/test-utils';
import { UserProfileGeneralInfoPanel } from './user-profile-general-info-panel';

const createTestProps = props => ({
  isSubmitting: false,
  hasAttemptedSubmit: false,
  values: {
    email: 'john@snow.got',
    firstName: 'John',
    lastName: 'Snow',
  },
  errors: {},
  intl: intlMock,
  touched: {},
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ...props,
});

describe('rendering', () => {
  describe('when there are no errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<UserProfileGeneralInfoPanel {...props} />);
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

  describe('when there is a validation error on first name', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        errors: { firstNameMissing: true },
        touched: { firstName: true },
        hasAttemptedSubmit: true,
      });
      wrapper = shallow(<UserProfileGeneralInfoPanel {...props} />);
    });
    it('should ensure layout structure', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should show the error', () => {
      expect(wrapper.find('FormattedMessage')).toHaveProp(
        'id',
        'Validation.required'
      );
    });
    it('should highlight the first name input', () => {
      expect(wrapper.find({ name: 'firstName' })).toHaveProp(
        'hasWarning',
        true
      );
    });
  });
  describe('when submitting', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        isSubmitting: true,
        touched: { firstName: true },
      });
      wrapper = shallow(<UserProfileGeneralInfoPanel {...props} />);
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
