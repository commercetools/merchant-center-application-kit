import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ConfigureIntlProvider from './configure-intl-provider';

const createTestProps = props => ({
  locale: 'de',
  messages: { title: 'Title' },
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  describe('when locale is defined', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(
        <ConfigureIntlProvider {...props}>
          <div />
        </ConfigureIntlProvider>
      );
    });
    it('should pass locale to <IntlProvider>', () => {
      expect(wrapper.find(IntlProvider)).toHaveProp('locale', 'de');
    });
    it('should pass messages for given language to <IntlProvider>', () => {
      expect(wrapper.find(IntlProvider)).toHaveProp('messages', {
        title: 'Title',
      });
    });
  });
  describe('when locale is not defined', () => {
    beforeEach(() => {
      props = createTestProps({ locale: null, messages: null });
      wrapper = shallow(
        <ConfigureIntlProvider {...props}>
          <div />
        </ConfigureIntlProvider>
      );
    });
    it('should pass fallback locale to <IntlProvider>', () => {
      expect(wrapper.find(IntlProvider)).toHaveProp('locale', 'en');
    });
    it('should pass fallback messages to <IntlProvider>', () => {
      expect(wrapper.find(IntlProvider)).toHaveProp('messages', {});
    });
  });
});
