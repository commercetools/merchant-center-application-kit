import React from 'react';
import { shallow } from 'enzyme';
import { ButtonClose } from './button-close';

const createTestProps = props => ({
  onClick: jest.fn(),
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),
  isMouseOver: false,
  ...props,
});

describe('rendering', () => {
  describe('render component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ButtonClose {...createTestProps()} />);
    });
    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the close icon', () => {
      expect(wrapper).toRender('CloseIcon');
    });
  });
});

describe('callbacks', () => {
  describe('when clicking close icon', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ButtonClose {...props} />);
      wrapper.find({ className: 'button-close-container' }).simulate('click');
    });

    it('should trigger the onClick on ButtonClose', () => {
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('when hovering the icon', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isMouseOver: true });
      wrapper = shallow(<ButtonClose {...props} />);
    });

    it('should set the green theme for the icon on hovering', () => {
      expect(wrapper.find('CloseIcon')).toHaveProp('theme', 'green');
    });
  });

  describe('when no hovering the icon', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ButtonClose {...props} />);
    });

    it('should set the green theme for the icon on hovering', () => {
      expect(wrapper.find('CloseIcon')).toHaveProp('theme', 'black');
    });
  });
});
