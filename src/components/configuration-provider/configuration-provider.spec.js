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

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should pass `configuration` to `<Provider>`', () => {
      expect(wrapper).toRender({ value: configuration });
    });

    describe('with children', () => {
      it('should render the children', () => {
        expect(wrapper).toRender('div');
      });
    });
  });

  describe('statics', () => {
    describe('propTypes', () => {
      it('should contain `configuration`', () => {
        expect(ConfigurationProvider.propTypes.configuration).toBeDefined();
      });
    });
  });
});
