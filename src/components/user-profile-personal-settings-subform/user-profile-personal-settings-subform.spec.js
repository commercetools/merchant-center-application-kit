import React from 'react';
import { shallow } from 'enzyme';
import { intlMock } from '@commercetools-local/test-utils';
import { UserProfilePersonalSettingsSubform } from './user-profile-personal-settings-subform';

const createFormProps = props => ({
  isSubmitting: false,
  values: {
    language: 'en',
    timeZone: 'Europe/Berlin',
  },
  intl: intlMock,
  setFieldValue: jest.fn(),
  setFieldTouched: jest.fn(),

  ...props,
});
const createTestProps = props => ({
  form: createFormProps(),

  intl: intlMock,
  timeZones: {
    'Europe/Berlin': { name: 'Europe/Berlin', abbr: 'CEST', offset: '+02:00' },
  },
  user: {
    locale: 'en',
  },

  ...props,
});

describe('rendering', () => {
  describe('when not submitting', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<UserProfilePersonalSettingsSubform {...props} />);
    });
    it('should ensure layout structure', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render select for language', () => {
      expect(wrapper).toRender({ name: 'language' });
    });
    it('should render select for timeZone', () => {
      expect(wrapper).toRender({ name: 'timeZone' });
    });
  });

  describe('when submitting', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        form: createFormProps({
          isSubmitting: true,
          touched: { firstName: true },
        }),
      });
      wrapper = shallow(<UserProfilePersonalSettingsSubform {...props} />);
    });
    it('should disable all input fields', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should disable the language dropdown', () => {
      expect(wrapper.find({ name: 'language' })).toHaveProp('disabled', true);
    });
  });
});
