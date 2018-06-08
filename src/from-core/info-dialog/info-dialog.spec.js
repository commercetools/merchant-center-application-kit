import React from 'react';
import { shallow } from 'enzyme';
import ButtonClose from '../button-close';
import InfoDialog from './info-dialog';

const createTestProps = props => ({
  isOpen: true,
  onClose: jest.fn(),
  children: [],
  ...props,
});

describe('rendering', () => {
  const props = createTestProps();
  const wrapper = shallow(<InfoDialog {...props} />);
  it('contains a ButtonClose button', () => {
    const buttonClose = wrapper.find(ButtonClose);
    expect(buttonClose).toHaveLength(1);
  });
});

describe('callbacks', () => {
  describe('close dialog', () => {
    const onClose = jest.fn();
    const props = createTestProps({
      onClose,
    });
    const wrapper = shallow(<InfoDialog {...props} />);
    it('triggers the onClose event', () => {
      const buttonClose = wrapper.find(ButtonClose);
      buttonClose.simulate('click');
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
