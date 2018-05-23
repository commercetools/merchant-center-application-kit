import React from 'react';
import { mount } from 'enzyme';
import injectConfiguration from './inject-configuration';

const TestComponent = () => <div>{'Test'}</div>;
TestComponent.displayName = 'TestComponent';
TestComponent.propTypes = {};

describe('HoC', () => {
  const context = {
    configuration: {
      foo: { config: 'value' },
      bar: { more: 'values' },
      baz: { much: 'amaze' },
    },
  };
  let Enhanced;
  let wrapper;

  describe('when requesting a configuration', () => {
    describe('when the configuration exists', () => {
      beforeEach(() => {
        Enhanced = injectConfiguration('foo')(TestComponent);

        wrapper = mount(<Enhanced />, { context });
      });

      it('should output correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should inject the configuration as a `prop`', () => {
        expect(wrapper.find(TestComponent)).toHaveProp(
          'configuration',
          context.configuration.foo
        );
      });
    });

    describe('when the configuration does not exist', () => {
      beforeEach(() => {
        Enhanced = injectConfiguration('nope')(TestComponent);

        wrapper = mount(<Enhanced />, { context });
      });

      it('should output correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should not inject the configuration as a `prop`', () => {
        expect(wrapper.prop('configuration')).not.toBeDefined();
      });
    });

    describe('when a `propName` is passed', () => {
      const propName = 'someFooProp';

      beforeEach(() => {
        Enhanced = injectConfiguration('foo', propName)(TestComponent);

        wrapper = mount(<Enhanced />, { context });
      });

      it('should output correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should inject the configuration as a `prop`', () => {
        expect(wrapper.find(TestComponent)).toHaveProp(
          propName,
          context.configuration.foo
        );
      });
    });
  });

  describe('when requesting a nested configuration property', () => {
    beforeEach(() => {
      Enhanced = injectConfiguration(['foo', 'config'])(TestComponent);

      wrapper = mount(<Enhanced />, { context });
    });

    it('should inject the configuration as a `prop`', () => {
      expect(wrapper.find(TestComponent)).toHaveProp(
        'configuration',
        context.configuration.foo.config
      );
    });
  });
});
