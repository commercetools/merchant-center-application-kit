import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { ConfigureIntlProvider } from './configure-intl-provider';

jest.mock('@commercetools-local/utils/storage');

const createTestProps = props => ({
  i18n: {
    en: { title: 'Title' },
    'en-US': { title: 'Title' },
    de: { title: 'Titel' },
  },
  user: undefined,
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  describe('when user is not defined', () => {
    beforeEach(() => {
      window.navigator = { language: 'en-US' };
      props = createTestProps();
      wrapper = shallow(
        <ConfigureIntlProvider {...props}>
          <div />
        </ConfigureIntlProvider>
      );
    });
    it('should pass browser locale to <IntlProvider>', () => {
      expect(wrapper.find(IntlProvider)).toHaveProp('locale', 'en-US');
    });
    it('should pass messages for given locale to <IntlProvider>', () => {
      expect(wrapper.find(IntlProvider)).toHaveProp('messages', {
        title: 'Title',
      });
    });
  });
  describe('when user is defined', () => {
    beforeEach(() => {
      window.navigator = { language: 'en-US' };
      props = createTestProps({ user: { language: 'de' } });
      wrapper = shallow(
        <ConfigureIntlProvider {...props}>
          <div />
        </ConfigureIntlProvider>
      );
    });
    it('should pass browser locale to <IntlProvider>', () => {
      expect(wrapper.find(IntlProvider)).toHaveProp('locale', 'de');
    });
    it('should pass messages for given locale to <IntlProvider>', () => {
      expect(wrapper.find(IntlProvider)).toHaveProp('messages', {
        title: 'Titel',
      });
    });
  });
});
