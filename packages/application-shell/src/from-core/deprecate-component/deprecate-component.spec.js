import React from 'react';
import { shallow } from 'enzyme';
import warning from 'warning';
import deprecateComponent from './deprecate-component';

jest.mock('warning', () => jest.fn());

const ChildComponent = () => <div className="child" />;
ChildComponent.displayName = 'ChildComponent';
const message = 'foo';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    const DeprecatedChild = deprecateComponent({ message })(ChildComponent);
    wrapper = shallow(<DeprecatedChild />);
  });
  it('should render original component', () => {
    expect(wrapper).toRender(ChildComponent);
  });
});

describe('lifecycle', () => {
  let wrapper;
  beforeEach(() => {
    const DeprecatedChild = deprecateComponent({ message })(ChildComponent);
    wrapper = shallow(<DeprecatedChild />);
    wrapper.instance().componentDidMount();
  });
  it('should call `warning`', () => {
    expect(warning).toBeCalled();
  });
  it('should call `warning` with `foo`', () => {
    expect(warning).toBeCalledWith(
      expect.any(Boolean),
      expect.stringContaining(message)
    );
  });
});
