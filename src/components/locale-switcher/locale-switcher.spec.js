import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import React from 'react';
import LocaleSwitcher from './locale-switcher';

const createTestProps = props => ({
  projectDataLocale: 'en',
  setProjectDataLocale: jest.fn(),
  languages: ['en', 'de', 'it'],
  ...props,
});

const TestLabel = props => <div>{props.children}</div>;
TestLabel.propTypes = { children: PropTypes.element.isRequired };

describe('render base elements', () => {
  let wrapper;
  beforeEach(() => {
    const props = createTestProps();
    wrapper = shallow(<LocaleSwitcher {...props} />);
  });

  it('should render data-track-component', () => {
    expect(wrapper).toRender({
      'data-track-component': 'LocaleSwitch',
    });
  });

  it('should render Select component', () => {
    expect(wrapper).toRender('Select');
  });

  describe('dropdown label', () => {
    let wrapperLabel;
    beforeEach(() => {
      const props = createTestProps();
      wrapper = shallow(<LocaleSwitcher {...props} />);
      wrapperLabel = shallow(
        <TestLabel>{wrapper.instance().renderLabel()}</TestLabel>
      );
    });
    it('should render dropdown label', () => {
      expect(wrapperLabel).toIncludeText('en3');
    });
    it('should render WorldIcon', () => {
      expect(wrapperLabel).toRender('WorldIcon');
    });
  });
});

describe('callbacks', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
    const wrapper = shallow(<LocaleSwitcher {...props} />);
    wrapper.find('Select').prop('onChange')({ key: 'de' });
  });

  it('should call setProjectDataLocale', () => {
    expect(props.setProjectDataLocale).toHaveBeenCalledTimes(1);
    expect(props.setProjectDataLocale).toHaveBeenLastCalledWith('de');
  });
});
