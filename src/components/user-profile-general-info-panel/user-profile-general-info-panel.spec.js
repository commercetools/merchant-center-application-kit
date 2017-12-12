import React from 'react';
import { shallow } from 'enzyme';
import { intlMock } from '@commercetools-local/test-utils';
import { UserProfileGeneralInfoPanel } from './user-profile-general-info-panel';

const createTestProps = props => ({
  hasSubmitFailed: false,
  intl: intlMock,
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<UserProfileGeneralInfoPanel {...props} />);
  });
  it('should ensure layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render <Field> for firstName', () => {
    expect(wrapper).toRender({ name: 'firstName' });
  });
  it('should render <Field> for lastName', () => {
    expect(wrapper).toRender({ name: 'lastName' });
  });
  it('should render <Field> for email', () => {
    expect(wrapper).toRender({ name: 'email' });
  });
});
