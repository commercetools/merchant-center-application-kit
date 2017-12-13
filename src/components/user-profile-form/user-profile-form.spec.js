import React from 'react';
import { shallow } from 'enzyme';
import SaveToolbar from '@commercetools-local/core/components/save-toolbar';
import UserProfileGeneralInfoPanel from '../user-profile-general-info-panel';
import { UserProfileForm } from './user-profile-form';

// TODO replace with test-utils intlMock after RR4 migration #RR4
const intlMock = {
  formatMessage: message => message.id,
  formatDate: () => 'xxx',
  formatTime: () => 'xxx',
  formatRelative: () => 'xxx',
  formatNumber: () => 'xxx',
  formatPlural: () => 'xxx',
  formatHTMLMessage: () => 'xxx',
  now: () => 'xxx',
};

const createTestProps = props => ({
  onSubmit: jest.fn(),
  handleSubmit: jest.fn(() => () => {}),
  route: {},
  isSaveToolbarAlwaysVisible: false,
  intl: intlMock,
  // Connected (redux-form)
  invalid: false,
  dirty: false,
  pristine: false,
  submitting: false,
  change: jest.fn(),
  reset: jest.fn(),
  submitSucceeded: false,
  syncErrors: {},
  submitFailed: false,
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<UserProfileForm {...props} />);
  });
  it('should ensure layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render <UserProfileGeneralInfoPanel>', () => {
    expect(wrapper).toRender(UserProfileGeneralInfoPanel);
  });
  describe('<SaveToolbar>', () => {
    describe('when form is not submitted and is dirty', () => {
      beforeEach(() => {
        props = createTestProps({ submitSucceeded: false, dirty: true });
        wrapper = shallow(<UserProfileForm {...props} />);
      });
      it('should pass true to shouldWarnOnLeave prop', () => {
        expect(wrapper.find(SaveToolbar)).toHaveProp('shouldWarnOnLeave', true);
      });
    });
    describe('when save toolbar should always be visible', () => {
      beforeEach(() => {
        props = createTestProps({ isSaveToolbarAlwaysVisible: true });
        wrapper = shallow(<UserProfileForm {...props} />);
      });
      it('should pass true isToolbarVisible prop', () => {
        expect(wrapper.find(SaveToolbar)).toHaveProp('isToolbarVisible', true);
      });
    });
    describe('when save toolbar should not always be visible and form is dirty', () => {
      beforeEach(() => {
        props = createTestProps({
          isSaveToolbarAlwaysVisible: false,
          dirty: true,
        });
        wrapper = shallow(<UserProfileForm {...props} />);
      });
      it('should pass true isToolbarVisible prop', () => {
        expect(wrapper.find(SaveToolbar)).toHaveProp('isToolbarVisible', true);
      });
    });
    describe('when form is submitting', () => {
      beforeEach(() => {
        props = createTestProps({
          submitting: true,
        });
        wrapper = shallow(<UserProfileForm {...props} />);
      });
      it('should pass true to isToolbarDisabled prop', () => {
        expect(wrapper.find(SaveToolbar)).toHaveProp('isToolbarDisabled', true);
      });
    });
    describe('when form is pristine', () => {
      beforeEach(() => {
        props = createTestProps({
          pristine: true,
        });
        wrapper = shallow(<UserProfileForm {...props} />);
      });
      it('should pass true to isToolbarDisabled prop', () => {
        expect(wrapper.find(SaveToolbar)).toHaveProp('isToolbarDisabled', true);
      });
    });
    describe('when form is invalid', () => {
      beforeEach(() => {
        props = createTestProps({
          invalid: true,
        });
        wrapper = shallow(<UserProfileForm {...props} />);
      });
      it('should pass true to isToolbarDisabled prop', () => {
        expect(wrapper.find(SaveToolbar)).toHaveProp('isToolbarDisabled', true);
      });
    });
  });
});
