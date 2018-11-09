import React from 'react';
import { shallow } from 'enzyme';
import MenuStateContainer from './menu-state-container';

const Component = props => <div {...props}>Component</div>;
Component.displayName = 'Component';

const createTestProps = props => ({
  ...props,
});

describe('<MenuStateContainer>', () => {
  let wrapper;
  let props;
  let children;

  describe('state', () => {
    describe('toggleMenu', () => {
      beforeEach(() => {
        props = createTestProps();
        children = jest.fn(() => <Component />);
        wrapper = shallow(
          <MenuStateContainer {...props}>{children}</MenuStateContainer>
        );

        wrapper.instance().toggleMenu();
      });

      it('should set `isOpen` to `true`', () => {
        expect(wrapper).toHaveState('isOpen', true);
      });
      it('should call `children` with isOpen', () => {
        expect(children).toHaveBeenCalledWith(
          expect.objectContaining({
            isOpen: true,
            toggleMenu: wrapper.instance().toggleMenu,
          })
        );
      });
    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      props = createTestProps();
      children = jest.fn(() => <Component />);
      wrapper = shallow(
        <MenuStateContainer {...props}>{children}</MenuStateContainer>
      );
    });
    it('should call `children` with isOpen', () => {
      expect(children).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: false,
        })
      );
    });
    it('should call `children` with toggleMenu', () => {
      expect(children).toHaveBeenCalledWith(
        expect.objectContaining({
          toggleMenu: wrapper.instance().toggleMenu,
        })
      );
    });
  });
});
