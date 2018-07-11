import React from 'react';
import { shallow } from 'enzyme';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import AsyncLocaleMessages from './async-locale-messages';

jest.mock('@commercetools-frontend/sentry');

const ChildComponent = () => <div>Child</div>;

const createTestProps = props => ({
  children: () => <ChildComponent />,
  locale: 'en-US',
  loadIntl: {
    en: jest.fn(() => new Promise(resolve => resolve({}))),
    de: jest.fn(() => new Promise(resolve => resolve({}))),
    es: () => {},
  },
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  describe('if there is an error', () => {
    const error = new Error('oh no!');
    beforeEach(() => {
      props = createTestProps({
        loadIntl: {
          en: () => new Promise((resolve, reject) => reject(error)),
          de: () => {},
          es: () => {},
        },
      });
      wrapper = shallow(<AsyncLocaleMessages {...props} />);
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
      wrapper = shallow(<AsyncLocaleMessages {...props} />);
    });
    describe('when component is mounted', () => {
      beforeEach(() => {
        wrapper.instance().componentDidMount();
      });

      it('should call `loadIntl`', () => {
        expect(props.loadIntl.en).toHaveBeenCalled();
      });
    });

    describe('when component is updated but with same locale', () => {
      beforeEach(() => {
        wrapper.instance().componentDidUpdate({
          locale: 'en-CA',
        });
      });

      it('should not call `loadIntl`', () => {
        expect(props.loadIntl.en).toHaveBeenCalledTimes(0);
      });
    });
    describe('when component is updated with different locale', () => {
      beforeEach(() => {
        props = createTestProps({
          locale: 'de-AT',
        });
        wrapper = shallow(<AsyncLocaleMessages {...props} />);
        wrapper.instance().componentDidUpdate({
          locale: 'en-CA',
        });
      });

      it('should call `loadIntl`', () => {
        expect(props.loadIntl.de).toHaveBeenCalled();
      });
    });
  });
});
