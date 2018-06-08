import React from 'react';
import { shallow } from 'enzyme';
import Card from './card';

describe('rendering', () => {
  describe('with `raised` `type`', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Card>{'text'}</Card>);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply the `type-raised` class name', () => {
      expect(wrapper).toHaveClassName('type-raised');
    });
  });

  describe('with `flat` `type`', () => {
    const props = { type: 'flat' };
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Card {...props}>{'text'}</Card>);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply the `type-flat` class name', () => {
      expect(wrapper).toHaveClassName('type-flat');
    });
  });

  describe('with `light` theme', () => {
    const props = { theme: 'light' };
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Card {...props}>{'text'}</Card>);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply the `theme-light` class name', () => {
      expect(wrapper).toHaveClassName('theme-light');
    });
  });

  describe('with `dark` theme', () => {
    const props = { theme: 'dark' };
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Card {...props}>{'text'}</Card>);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should apply the `theme-dark` class name', () => {
      expect(wrapper).toHaveClassName('theme-dark');
    });
  });
});
