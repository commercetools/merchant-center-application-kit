import React from 'react';
import { shallow } from 'enzyme';
import LoginBox from './login-box';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    const Foo = () => <div />;
    wrapper = shallow(
      <LoginBox>
        <Foo />
      </LoginBox>
    );
  });
  it('should output correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
