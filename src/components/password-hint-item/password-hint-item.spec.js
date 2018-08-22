import React from 'react';
import { shallow } from 'enzyme';
import {
  SuccessIcon,
  CloseBoldIcon,
} from '@commercetools-frontend/ui-kit/icons';
import PasswordHintItem from './password-hint-item';
import styles from './password-hint-item.mod.css';

const createTestProps = props => ({
  fulfilled: true,
  checkUnfulfilled: true,
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<PasswordHintItem {...props}>Hint #1</PasswordHintItem>);
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('with fulfilled hint', () => {
    describe.each([[true], [false]])(
      'when `checkUnfulfilled` is `%s`',
      checkUnfulfilled => {
        beforeEach(() => {
          props = createTestProps({ fulfilled: true, checkUnfulfilled });
          wrapper = shallow(
            <PasswordHintItem {...props}>Hint #1</PasswordHintItem>
          );
        });
        it('should have `SuccessIcon`', () => {
          expect(wrapper).toRender(SuccessIcon);
        });
        it('should have hint styled as `fullfilled`', () => {
          expect(wrapper.find(`.${styles.hint}`)).toHaveClassName(
            styles.fulfilled
          );
        });
      }
    );
  });
  describe('with un-fulfilled hint', () => {
    describe('when `checkUnfulfilled` is `true`', () => {
      beforeEach(() => {
        props = createTestProps({ fulfilled: false, checkUnfulfilled: true });
        wrapper = shallow(
          <PasswordHintItem {...props}>Hint #1</PasswordHintItem>
        );
      });
      it('should have `CloseBoldIcon`', () => {
        expect(wrapper).toRender(CloseBoldIcon);
      });
      it('should have hint styled as `un-fulfilled`', () => {
        expect(wrapper.find(`.${styles.hint}`)).toHaveClassName(
          styles['un-fulfilled']
        );
      });
    });
    describe('when `checkUnfulfilled` is `false`', () => {
      beforeEach(() => {
        props = createTestProps({ fulfilled: false, checkUnfulfilled: false });
        wrapper = shallow(
          <PasswordHintItem {...props}>Hint #1</PasswordHintItem>
        );
      });
      it('should not have `CloseBoldIcon`', () => {
        expect(wrapper).not.toRender(CloseBoldIcon);
      });
      it('should not have `SuccessIcon`', () => {
        expect(wrapper).not.toRender(SuccessIcon);
      });
      it('should have hint styled as `unchecked`', () => {
        expect(wrapper.find(`.${styles.hint}`)).toHaveClassName(
          styles.unchecked
        );
      });
    });
  });
});
