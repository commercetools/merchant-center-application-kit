import React from 'react';
import { shallow } from 'enzyme';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import AsyncLocaleData from './async-locale-data';

jest.mock('@commercetools-frontend/sentry');

const ChildComponent = () => <div>Child</div>;

const createTestProps = props => ({
  children: () => <ChildComponent />,
  locale: 'en-US',
  loadI18n: jest.fn(() => new Promise(resolve => resolve({}))),
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  describe('if there is an error', () => {
    const error = new Error('oh no!');
    beforeEach(() => {
      props = createTestProps({
        loadI18n: () => new Promise((resolve, reject) => reject(error)),
      });
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
      props = createTestProps();
      wrapper = shallow(<AsyncLocaleData {...props} />);
    });
    describe('when component is mounted', () => {
      beforeEach(() => {
        wrapper.instance().componentDidMount();
      });

      it('should call `loadIntl`', () => {
        expect(props.loadI18n).toHaveBeenCalled();
      });
    });

    describe('when component is updated but with same locale', () => {
      beforeEach(() => {
        wrapper.instance().componentDidUpdate({
          locale: 'en-CA',
        });
      });

      it('should not call `loadIntl`', () => {
        expect(props.loadI18n).toHaveBeenCalledTimes(0);
      });
    });
    describe('when component is updated with different locale', () => {
      beforeEach(() => {
        props = createTestProps({
          locale: 'de-AT',
        });
        wrapper = shallow(<AsyncLocaleData {...props} />);
        wrapper.instance().componentDidUpdate({
          locale: 'en-CA',
        });
      });

      it('should call `loadIntl`', () => {
        expect(props.loadI18n).toHaveBeenCalled();
      });

      it('should call `loadIntl` with `de`', () => {
        expect(props.loadI18n).toHaveBeenCalledWith('de');
      });
    });
  });
});
