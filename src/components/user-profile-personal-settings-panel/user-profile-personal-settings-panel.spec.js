import React from 'react';
import { shallow } from 'enzyme';
import { intlMock } from '@commercetools-local/test-utils';
import { UserProfilePersonalSettingsPanel } from './user-profile-personal-settings-panel';

const createTestProps = props => ({
  isSubmitting: false,
  values: {
    language: 'en',
    timeZone: 'Europe/Berlin',
  },
  intl: intlMock,
  onChangeFieldValue: jest.fn(),
  onBlurField: jest.fn(),
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
      wrapper = shallow(<UserProfilePersonalSettingsPanel {...props} />);
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
        isSubmitting: true,
        touched: { firstName: true },
      });
      wrapper = shallow(<UserProfilePersonalSettingsPanel {...props} />);
    });
    it('should disable all input fields', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should disable the language dropdown', () => {
      expect(wrapper.find({ name: 'language' })).toHaveProp('disabled', true);
    });
  });
});
