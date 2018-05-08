/* eslint-disable no-console */
import React from 'react';
import { shallow } from 'enzyme';
import { VersionCheckSubscriber } from './version-check-subscriber';

const createTestProps = props => ({
  fetchServerVersion: jest.fn(),
  clientVersion: '123',
  ...props,
});

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    const props = createTestProps();
    wrapper = shallow(<VersionCheckSubscriber {...props} />);
  });
  it('should render nothing', () => {
    expect(wrapper.type()).toBe(null);
  });
});

describe('lifecycle', () => {
  let props;
  let wrapper;
  describe('componentDidMount', () => {
    describe('if env is development', () => {
      const currentEnv = process.env.NODE_ENV;
      beforeEach(() => {
        process.env.NODE_ENV = 'development';
        props = createTestProps();
        wrapper = shallow(<VersionCheckSubscriber {...props} />);
        wrapper.instance().componentDidMount();
      });
      afterEach(() => {
        process.env.NODE_ENV = currentEnv;
      });
      it('should do nothing', () => {
        expect(props.fetchServerVersion).toHaveBeenCalledTimes(0);
      });
    });
    describe('if env is not development', () => {
      beforeEach(() => {
        console.info = jest.fn();
        console.warn = jest.fn();
      });
      describe('if deployed version is the same as the one in the browser', () => {
        beforeEach(async () => {
          jest.useFakeTimers();
          const fetchServerVersionResult = Promise.resolve({ revision: '123' });
          props = createTestProps({
            fetchServerVersion: jest.fn(() => fetchServerVersionResult),
            clientVersion: '123',
          });
          wrapper = shallow(<VersionCheckSubscriber {...props} />);
          wrapper.instance().componentDidMount();
          jest.runOnlyPendingTimers();
          await fetchServerVersionResult;
        });
        it('should not notify', () => {
          expect(console.info).toHaveBeenCalledTimes(0);
        });
        it('should assign interval reference into component instance', () => {
          expect(wrapper.instance().poll).toBeDefined();
        });
      });
      describe('if deployed version is different then the one in the browser', () => {
        beforeEach(async () => {
          jest.useFakeTimers();
          const fetchServerVersionResult = Promise.resolve({ revision: '456' });
          props = createTestProps({
            fetchServerVersion: jest.fn(() => fetchServerVersionResult),
            clientVersion: '123',
          });
          wrapper = shallow(<VersionCheckSubscriber {...props} />);
          wrapper.instance().componentDidMount();
          jest.runOnlyPendingTimers();
          await fetchServerVersionResult;
        });
        it('should notify', () => {
          expect(console.info).toHaveBeenCalledWith(
            'VersionCheckSubscriber: New version available, please reload the page'
          );
        });
        it('should assign interval reference into component instance', () => {
          expect(wrapper.instance().poll).toBeDefined();
        });
      });
    });
  });
  describe('componentWillUnmount', () => {
    describe('if env is development', () => {
      const currentEnv = process.env.NODE_ENV;
      beforeEach(() => {
        jest.useFakeTimers();
        process.env.NODE_ENV = 'development';
        props = createTestProps();
        wrapper = shallow(<VersionCheckSubscriber {...props} />);
        wrapper.instance().poll = 'foo';
        wrapper.instance().componentWillUnmount();
      });
      afterEach(() => {
        process.env.NODE_ENV = currentEnv;
      });
      it('should do nothing', () => {
        expect(clearInterval).toHaveBeenCalledTimes(0);
      });
    });
    describe('if env is not development', () => {
      beforeEach(() => {
        jest.useFakeTimers();
        props = createTestProps();
        wrapper = shallow(<VersionCheckSubscriber {...props} />);
        wrapper.instance().poll = 'foo';
        wrapper.instance().componentWillUnmount();
      });
      it('should clear the interval', () => {
        expect(clearInterval).toHaveBeenCalledWith('foo');
      });
    });
  });
});
