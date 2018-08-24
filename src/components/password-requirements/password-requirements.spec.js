import React from 'react';
import { shallow } from 'enzyme';
import PasswordRequirements from './password-requirements';
import styles from './password-requirements.mod.css';

const createTestProps = props => ({
  isExpanded: true,
  shouldShowUnfulfilledAsError: true,
  ...props,
});

const Child = () => <div />;

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(
      <PasswordRequirements {...props}>
        <Child />
      </PasswordRequirements>
    );
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('when `shouldShowUnfulfilledAsError` is `true`', () => {
    beforeEach(() => {
      props = createTestProps({ shouldShowUnfulfilledAsError: true });
      wrapper = shallow(
        <PasswordRequirements {...props}>
          <Child />
        </PasswordRequirements>
      );
    });
    it('should pass on `shouldShowUnfulfilledAsError` to children', () => {
      expect(wrapper.find(Child)).toHaveProp(
        'shouldShowUnfulfilledAsError',
        true
      );
    });
  });
  describe('when `shouldShowUnfulfilledAsError` is `false`', () => {
    beforeEach(() => {
      props = createTestProps({ shouldShowUnfulfilledAsError: false });
      wrapper = shallow(
        <PasswordRequirements {...props}>
          <Child />
        </PasswordRequirements>
      );
    });
    it('should pass on `shouldShowUnfulfilledAsError` to children', () => {
      expect(wrapper.find(Child)).toHaveProp(
        'shouldShowUnfulfilledAsError',
        false
      );
    });
  });
  describe('when `isExpanded` is `true`', () => {
    beforeEach(() => {
      props = createTestProps({ isExpanded: true });
      wrapper = shallow(
        <PasswordRequirements {...props}>
          <Child />
        </PasswordRequirements>
      );
    });
    it('should pass on `shouldShowUnfulfilledAsError` to children', () => {
      expect(
        wrapper.find(`.${styles['password-requirements']}`)
      ).toHaveClassName(styles.expanded);
    });
  });
  describe('when `isExpanded` is `false`', () => {
    beforeEach(() => {
      props = createTestProps({ isExpanded: false });
      wrapper = shallow(
        <PasswordRequirements {...props}>
          <Child />
        </PasswordRequirements>
      );
    });
    it('should pass on `shouldShowUnfulfilledAsError` to children', () => {
      expect(
        wrapper.find(`.${styles['password-requirements']}`)
      ).not.toHaveClassName(styles.expanded);
    });
  });
});
