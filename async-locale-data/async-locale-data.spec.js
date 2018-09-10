import React from 'react';
import { shallow } from 'enzyme';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import loadI18n from '@commercetools-frontend/i18n/load-i18n';
import AsyncLocaleData from './async-locale-data';

jest.mock('@commercetools-frontend/sentry');

jest.mock('../load-i18n', () => jest.fn());

const ChildComponent = () => <div>Child</div>;

const createTestProps = props => ({
  children: jest.fn(() => <ChildComponent />),
  locale: 'en-US',
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
          messages: { title: 'Title en' },
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

      it('should call `loadIntl` with `de` and `at`', () => {
        expect(loadI18n).toHaveBeenCalledWith('de', 'at');
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
