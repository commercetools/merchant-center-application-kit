import React from 'react';
import { shallow } from 'enzyme';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import loadI18n from '../load-i18n';
import AsyncLocaleData from './async-locale-data';

jest.mock('@commercetools-frontend/sentry');

jest.mock('../load-i18n', () => jest.fn());

const ChildComponent = () => <div>Child</div>;

const createTestProps = props => ({
  children: jest.fn(() => <ChildComponent />),
  locale: 'en-US',
  applicationMessages: {
    en: { 'CustomApp.title': 'Title en' },
  },
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  describe('if there is an error', () => {
    let error;
    beforeEach(() => {
      error = new Error('oh no!');
      loadI18n.mockClear();
      loadI18n.mockImplementation(jest.fn(() => Promise.reject(error)));
      props = createTestProps();
      wrapper = shallow(<AsyncLocaleData {...props} />);
    });
    describe('when component is mounted', () => {
      beforeEach(() => {
        reportErrorToSentry.mockClear();
        wrapper.instance().componentDidMount();
      });
      it('should report the error to sentry', () => {
        expect(reportErrorToSentry).toHaveBeenCalledWith(error, {});
      });
    });
  });

  describe('if there is no error', () => {
    beforeEach(() => {
      loadI18n.mockClear();
      loadI18n.mockImplementation(
        jest.fn(() => Promise.resolve({ title: 'Title en' }))
      );
      props = createTestProps();
      wrapper = shallow(<AsyncLocaleData {...props} />);
    });
    describe('when component is mounted', () => {
      beforeEach(() => {
        wrapper.instance().componentDidMount();
      });

      it('should call `loadIntl`', () => {
        expect(loadI18n).toHaveBeenCalled();
      });
      it('should call `children` with state', () => {
        expect(props.children).toHaveBeenCalledWith({
          isLoading: false,
          language: 'en',
          messages: { title: 'Title en', ...props.applicationMessages.en },
        });
      });
    });

    describe('when component is updated but with same locale', () => {
      beforeEach(() => {
        wrapper.instance().componentDidUpdate({
          locale: 'en-in',
        });
      });

      it('should call `loadIntl`', () => {
        expect(loadI18n).toHaveBeenCalledTimes(1);
      });
    });
    describe('when component is updated with new locale', () => {
      beforeEach(() => {
        loadI18n.mockClear();
        props = createTestProps({
          locale: 'de-AT',
        });
        wrapper = shallow(<AsyncLocaleData {...props} />);
        wrapper.instance().componentDidUpdate({
          locale: 'en-CA',
        });
      });

      it('should call `loadIntl`', () => {
        expect(loadI18n).toHaveBeenCalled();
      });

      it('should call `loadIntl` with `de`', () => {
        expect(loadI18n).toHaveBeenCalledWith('de');
      });
    });
  });

  describe('when applicationMessages is a function', () => {
    beforeEach(() => {
      loadI18n.mockClear();
      loadI18n.mockClear();
      loadI18n.mockImplementation(
        jest.fn(() => Promise.resolve({ title: 'Title en' }))
      );
      props = createTestProps({
        locale: 'en-CA',
        applicationMessages: jest
          .fn(() => Promise.resolve({ 'CustomApp.title': 'New title en' }))
          .mockName('applicationMessages'),
      });
      wrapper = shallow(<AsyncLocaleData {...props} />);
    });

    describe('when component is mounted', () => {
      beforeEach(() => {
        wrapper.instance().componentDidMount();
      });

      it('should call `applicationMessagePromise`', () => {
        expect(props.applicationMessages).toHaveBeenCalled();
      });

      it('should call `applicationMessagePromise` with `en`', () => {
        expect(props.applicationMessages).toHaveBeenCalledWith('en');
      });

      it('should call `children` with state', () => {
        expect(props.children).toHaveBeenCalledWith({
          isLoading: false,
          language: 'en',
          messages: { title: 'Title en', 'CustomApp.title': 'New title en' },
        });
      });
    });
  });

  describe('when locale is not defined', () => {
    beforeEach(() => {
      loadI18n.mockClear();
      props = createTestProps({ locale: null });
      wrapper = shallow(<AsyncLocaleData {...props} />);
    });
    it('should not call `loadIntl`', () => {
      expect(loadI18n).not.toHaveBeenCalled();
    });
    it('should call `children` with state', () => {
      expect(props.children).toHaveBeenCalledWith({
        isLoading: true,
        language: null,
        messages: null,
      });
    });
  });
});
