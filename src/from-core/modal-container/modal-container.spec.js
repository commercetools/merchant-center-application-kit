import React from 'react';
import { shallow } from 'enzyme';
import ModalContainer from './modal-container';

describe('rendering', () => {
  const wrapper = shallow(<ModalContainer contentLabel="foo" />);

  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
