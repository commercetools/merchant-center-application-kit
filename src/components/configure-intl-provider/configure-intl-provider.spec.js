import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ConfigureIntlProvider from './configure-intl-provider';

const createTestProps = props => ({
  locale: 'en',
  timeZone: 'Europe/Madrid',
  messages: { title: 'Title' },
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  describe('when locale is not defined', () => {
    beforeEach(() => {
      props = createTestProps({ locale: undefined });
      wrapper = shallow(
        <ConfigureIntlProvider {...props}>
          <div />
        </ConfigureIntlProvider>
      );
    });
    it('should not render to avoid FOUC (flash of untranslated content)', () => {
      expect(wrapper).not.toRender(IntlProvider);
    });
  });
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
      expect(wrapper.find(IntlProvider)).toHaveProp('locale', 'en');
    });
    it('should pass messages for given locale to <IntlProvider>', () => {
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
});
