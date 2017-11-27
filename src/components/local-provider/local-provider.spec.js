import React from 'react';
import { shallow } from 'enzyme';
import { LocalProvider, mapStateToProps } from './local-provider';

describe('LocalProvider', () => {
  describe('rendering', () => {
    it('should render null when hasStateForActivePlugin is false', () => {
      const wrapper = shallow(
        <LocalProvider hasStateForActivePlugin={false} plugin="mcng-foo">
          <div />
        </LocalProvider>,
        { context: { store: {} } }
      );
      expect(wrapper.type()).toBe(null);
    });
    it('should render children when hasStateForActivePlugin is true', () => {
      const wrapper = shallow(
        <LocalProvider hasStateForActivePlugin={true} plugin="mcng-foo">
          <div />
        </LocalProvider>,
        { context: { store: {} } }
      );
      expect(wrapper.type()).toBe('div');
    });
  });

  describe('shouldComponentUpdate', () => {
    describe('hasStateForActivePlugin', () => {
      it('should update when it is activated', () => {
        const oldProps = {
          hasStateForActivePlugin: false,
          plugin: 'mcng-foo',
        };
        const newProps = {
          hasStateForActivePlugin: true,
          plugin: 'mcng-foo',
        };
        const wrapper = shallow(
          <LocalProvider {...oldProps}>
            <div />
          </LocalProvider>,
          { context: { store: {} } }
        );
        expect(wrapper.instance().shouldComponentUpdate(newProps)).toBe(true);
      });
      it('should not update when it is deactivated', () => {
        const oldProps = {
          hasStateForActivePlugin: true,
          plugin: 'mcng-foo',
        };
        const newProps = {
          hasStateForActivePlugin: false,
          plugin: 'mcng-foo',
        };
        const wrapper = shallow(
          <LocalProvider {...oldProps}>
            <div />
          </LocalProvider>,
          { context: { store: {} } }
        );
        expect(wrapper.instance().shouldComponentUpdate(newProps)).toBe(false);
      });
    });
  });
});

describe('mapStateToProps', () => {
  describe('hasStateForActivePlugin', () => {
    it('should be true when there is state for the plugin', () => {
      const state = { 'mcng-dashboard': {} };
      const ownProps = { plugin: 'mcng-dashboard' };
      const componentProps = mapStateToProps(state, ownProps);
      expect(componentProps.hasStateForActivePlugin).toBe(true);
    });
    it('should be false when there is no state for the plugin', () => {
      const state = { 'mcng-dashboard': {} };
      const ownProps = { plugin: 'mcng-products' };
      const componentProps = mapStateToProps(state, ownProps);
      expect(componentProps.hasStateForActivePlugin).toBe(false);
    });
  });
});
