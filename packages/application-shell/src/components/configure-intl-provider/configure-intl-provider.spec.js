import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ConfigureIntlProvider from './configure-intl-provider';

const createTestProps = props => ({
  language: 'de',
  timeZone: 'Europe/Madrid',
  messages: { title: 'Title' },
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  describe('when language is defined', () => {
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
    describe('AppShellProviderForUserTimeZone', () => {
      it('should render AppShellProviderForUserTimeZone', () => {
        expect(wrapper).toRender('AppShellProviderForUserTimeZone');
      });
      it('should have timeZone as prop', () => {
        expect(wrapper.find('AppShellProviderForUserTimeZone')).toHaveProp(
          'timeZone',
          props.timeZone
        );
      });
    });
  });
  describe('when language is not defined', () => {
    beforeEach(() => {
      props = createTestProps({ language: null, messages: null });
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
