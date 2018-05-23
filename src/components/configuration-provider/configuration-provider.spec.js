import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationProvider from './configuration-provider';

const configuration = {
  a: {
    config: 'value',
  },
};
describe('ConfigurationProvider', () => {
  describe('rendering', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurationProvider configuration={configuration}>
          <div />
        </ConfigurationProvider>
      );
    });

    describe('with children', () => {
      it('should render the children', () => {
        expect(wrapper.type()).toBe('div');
      });
    });
  });
});

describe('propTypes', () => {
  it('should contain `configuration`', () => {
    expect(ConfigurationProvider.propTypes.configuration).toBeDefined();
  });
});

describe('childContextTypes', () => {
  it('should contain `configuration`', () => {
    expect(ConfigurationProvider.childContextTypes.configuration).toBeDefined();
  });
});

describe('getChildContext', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ConfigurationProvider configuration={configuration}>
        <div />
      </ConfigurationProvider>
    );
  });

  it('should return the `configuration`', () => {
    expect(wrapper.instance().getChildContext().configuration).toBe(
      configuration
    );
  });
});
