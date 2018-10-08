import React from 'react';
import { shallow } from 'enzyme';
import LockedAccount, { HelpDeskLink, ResetPasswordLink } from './login-locked';

describe('LockedAccount', () => {
  describe('rendering', () => {
    let wrapper;
    describe('rendering', () => {
      beforeEach(() => {
        wrapper = shallow(<LockedAccount />);
      });
      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
      it('should render layout component', () => {
        expect(wrapper).toRender('ServicePageResponseLayout');
      });
    });
  });
});
describe('HelpDeskLink', () => {
  let wrapper;
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<HelpDeskLink />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
describe('ResetPasswordLink', () => {
  describe('rendering', () => {
    let wrapper;
    describe('rendering', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ResetPasswordLink adminCenterUrl="https://ac.ct.com" />
        );
      });
      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
