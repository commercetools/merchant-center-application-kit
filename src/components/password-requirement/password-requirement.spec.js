import React from 'react';
import { shallow } from 'enzyme';
import {
  SuccessIcon,
  CloseBoldIcon,
} from '@commercetools-frontend/ui-kit/icons';
import PasswordRequirement from './password-requirement';
import styles from './password-requirement.mod.css';

const createTestProps = props => ({
  fulfilled: true,
  shouldShowUnfulfilledAsError: true,
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(
      <PasswordRequirement {...props}>Requirement #1</PasswordRequirement>
    );
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('with fulfilled requirement', () => {
    describe.each([[true], [false]])(
      'when `shouldShowUnfulfilledAsError` is `%s`',
      shouldShowUnfulfilledAsError => {
        beforeEach(() => {
          props = createTestProps({
            fulfilled: true,
            shouldShowUnfulfilledAsError,
          });
          wrapper = shallow(
            <PasswordRequirement {...props}>Requirement #1</PasswordRequirement>
          );
        });
        it('should have `SuccessIcon`', () => {
          expect(wrapper).toRender(SuccessIcon);
        });
        it('should have requirement styled as `fullfilled`', () => {
          expect(wrapper.find(`.${styles.requirement}`)).toHaveClassName(
            styles.fulfilled
          );
        });
      }
    );
  });
  describe('with un-fulfilled requirement', () => {
    describe('when `shouldShowUnfulfilledAsError` is `true`', () => {
      beforeEach(() => {
        props = createTestProps({
          fulfilled: false,
          shouldShowUnfulfilledAsError: true,
        });
        wrapper = shallow(
          <PasswordRequirement {...props}>Requirement #1</PasswordRequirement>
        );
      });
      it('should have `CloseBoldIcon`', () => {
        expect(wrapper).toRender(CloseBoldIcon);
      });
      it('should have requirement styled as `unfulfilled`', () => {
        expect(wrapper.find(`.${styles.requirement}`)).toHaveClassName(
          styles.unfulfilled
        );
      });
    });
    describe('when `shouldShowUnfulfilledAsError` is `false`', () => {
      beforeEach(() => {
        props = createTestProps({
          fulfilled: false,
          shouldShowUnfulfilledAsError: false,
        });
        wrapper = shallow(
          <PasswordRequirement {...props}>Requirement #1</PasswordRequirement>
        );
      });
      it('should not have `CloseBoldIcon`', () => {
        expect(wrapper).not.toRender(CloseBoldIcon);
      });
      it('should not have `SuccessIcon`', () => {
        expect(wrapper).not.toRender(SuccessIcon);
      });
    });
  });
});
