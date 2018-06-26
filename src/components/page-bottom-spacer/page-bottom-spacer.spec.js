import React from 'react';
import { shallow } from 'enzyme';
import PageBottomSpacer from './page-bottom-spacer';

const createTestProps = props => ({
  size: 'm',
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<PageBottomSpacer {...props} />);
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('with default size', () => {
    it('should have class `height-m` by default', () => {
      expect(wrapper).toHaveClassName('height-m');
    });
  });
  describe('with size `l`', () => {
    beforeEach(() => {
      props = createTestProps({ size: 'l' });
      wrapper = shallow(<PageBottomSpacer {...props} />);
    });
    it('should have class `height-l`', () => {
      expect(wrapper).toHaveClassName('height-l');
    });
  });
  describe('with size `xl`', () => {
    beforeEach(() => {
      props = createTestProps({ size: 'xl' });
      wrapper = shallow(<PageBottomSpacer {...props} />);
    });
    it('should have class `height-xl`', () => {
      expect(wrapper).toHaveClassName('height-xl');
    });
  });
});
