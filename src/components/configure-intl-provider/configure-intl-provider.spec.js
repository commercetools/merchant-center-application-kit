import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ConfigureIntlProvider from './configure-intl-provider';

const createTestProps = props => ({
  language: 'en',
  timeZone: 'Europe/Madrid',
  messages: { title: 'Title' },
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
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
