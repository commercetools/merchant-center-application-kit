import React from 'react';
import { shallow } from 'enzyme';
import { UserSettingsMenu } from './user-settings-menu';

const createTestProps = props => ({
  firstName: 'John Test',
  lastName: 'Doe',
  email: 'john-doe@commercetools.de',
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),
  isMouseOver: false,
  ...props,
});

describe('render', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<UserSettingsMenu {...props} />);
  });

  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render `CaretDownIcon`', () => {
    expect(wrapper).toRender('CaretDownIcon');
  });

  it('should not render the menu', () => {
    expect(wrapper).not.toRender('Card');
  });
  it('should render `Avatar` component', () => {
    expect(wrapper).toRender('Avatar');
  });

  it('should pass prop firstName to `Avatar` component', () => {
    expect(wrapper.find('Avatar')).toHaveProp('firstName', 'John Test');
  });

  it('should pass prop lastName to `Avatar` component', () => {
    expect(wrapper.find('Avatar')).toHaveProp('lastName', 'Doe');
  });

  it('should pass prop email to `Avatar` component', () => {
    expect(wrapper.find('Avatar')).toHaveProp(
      'email',
      'john-doe@commercetools.de'
    );
  });
});

describe('callbacks', () => {
  describe('clicking to open the menu', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<UserSettingsMenu {...props} />);
      wrapper.find({ className: 'settings-container' }).simulate('click');
    });
    it('outputs correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the menu', () => {
      expect(wrapper).toRender('Card');
    });
  });

  describe('when hovering the menu', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isMouseOver: true });
      wrapper = shallow(<UserSettingsMenu {...props} />);
    });

    it('should set the grey theme for the icon on hovering', () => {
      expect(wrapper.find('CaretDownIcon')).toHaveProp('theme', 'grey');
    });
  });
});
