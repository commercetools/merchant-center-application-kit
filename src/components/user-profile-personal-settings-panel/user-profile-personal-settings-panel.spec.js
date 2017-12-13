import React from 'react';
import { shallow } from 'enzyme';
import { UserProfilePersonalSettingsPanel } from './user-profile-personal-settings-panel';

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
