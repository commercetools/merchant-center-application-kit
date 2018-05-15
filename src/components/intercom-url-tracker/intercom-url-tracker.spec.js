import React from 'react';
import { shallow } from 'enzyme';
import IntercomUrlTracker from './intercom-url-tracker';

let mockChangePage;
jest.mock('../../utils/intercom', () => ({
  changePage: (...args) => mockChangePage(...args),
}));

const createTestProps = custom => ({
  children: <div>{'foo'}</div>,
  ...custom,
});

let props;
let wrapper;

describe('lifecycle', () => {
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<IntercomUrlTracker {...props} />);
  });
  describe('UNSAFE_componentWillUpdate(', () => {
    beforeEach(() => {
      mockChangePage = jest.fn();
      wrapper.instance().UNSAFE_componentWillUpdate();
    });
    it('should call changePage', () => {
      expect(mockChangePage).toHaveBeenCalledTimes(1);
    });
  });
});

describe('rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<IntercomUrlTracker {...props} />);
  });
  it('should render its children', () => {
    expect(wrapper).toContainReact(<div>{'foo'}</div>);
  });
});
