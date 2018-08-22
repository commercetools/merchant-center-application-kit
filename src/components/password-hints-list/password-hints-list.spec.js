import React from 'react';
import { shallow } from 'enzyme';
import PasswordHintsList from './password-hints-list';
import styles from './password-hints-list.mod.css';

const createTestProps = props => ({
  expanded: true,
  checkUnfulfilled: true,
  ...props,
});

const Child = () => <div />;

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(
      <PasswordHintsList {...props}>
        <Child />
      </PasswordHintsList>
    );
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('when `checkUnfulfilled` is `true`', () => {
    beforeEach(() => {
      props = createTestProps({ checkUnfulfilled: true });
      wrapper = shallow(
        <PasswordHintsList {...props}>
          <Child />
        </PasswordHintsList>
      );
    });
    it('should pass on `checkUnfulfilled` to children', () => {
      expect(wrapper.find(Child)).toHaveProp('checkUnfulfilled', true);
    });
  });
  describe('when `checkUnfulfilled` is `false`', () => {
    beforeEach(() => {
      props = createTestProps({ checkUnfulfilled: false });
      wrapper = shallow(
        <PasswordHintsList {...props}>
          <Child />
        </PasswordHintsList>
      );
    });
    it('should pass on `checkUnfulfilled` to children', () => {
      expect(wrapper.find(Child)).toHaveProp('checkUnfulfilled', false);
    });
  });
  describe('when `expanded` is `true`', () => {
    beforeEach(() => {
      props = createTestProps({ expanded: true });
      wrapper = shallow(
        <PasswordHintsList {...props}>
          <Child />
        </PasswordHintsList>
      );
    });
    it('should pass on `checkUnfulfilled` to children', () => {
      expect(
        wrapper
          .find(`.${styles['password-hints-list']}`)
          .hasClass(styles.expanded)
      ).toBe(true);
    });
  });
  describe('when `expanded` is `false`', () => {
    beforeEach(() => {
      props = createTestProps({ expanded: false });
      wrapper = shallow(
        <PasswordHintsList {...props}>
          <Child />
        </PasswordHintsList>
      );
    });
    it('should pass on `checkUnfulfilled` to children', () => {
      expect(
        wrapper
          .find(`.${styles['password-hints-list']}`)
          .hasClass(styles.expanded)
      ).toBe(false);
    });
  });
});
