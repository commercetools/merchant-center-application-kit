import React from 'react';
import { shallow } from 'enzyme';
import { intlMock } from '@commercetools-local/test-utils';
import { UserProfilePersonalSettingsPanel } from './user-profile-personal-settings-panel';

const createTestProps = props => ({
  hasSubmitFailed: false,
  timeZones: {
    'Europe/Berlin': { name: 'Europe/Berlin', abbr: 'CEST', offset: '+02:00' },
  },
  intl: intlMock,
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<UserProfilePersonalSettingsPanel {...props} />);
  });
  it('should ensure layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render <Field> for language', () => {
    expect(wrapper).toRender({ name: 'language' });
  });
  it('should render <Field> for timeZone', () => {
    expect(wrapper).toRender({ name: 'timeZone' });
  });
});
