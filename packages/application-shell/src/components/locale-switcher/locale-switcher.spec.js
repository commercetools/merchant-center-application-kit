import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { SelectInput } from '@commercetools-frontend/ui-kit';
import React from 'react';
import LocaleSwitcher, { SingleValue } from './locale-switcher';

const createTestProps = props => ({
  projectDataLocale: 'en',
  setProjectDataLocale: jest.fn(),
  availableLocales: ['en', 'de', 'it'],
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

  it('should render Select component', () => {
    expect(wrapper).toRender(SelectInput);
  });

  describe('dropdown label', () => {
    let wrapperLabel;
    beforeEach(() => {
      const props = createTestProps();
      wrapperLabel = shallow(
        <SingleValue localeCount={props.availableLocales.length}>
          {props.projectDataLocale}
        </SingleValue>
      );
    });
    it('should render dropdown label', () => {
      expect(wrapperLabel).toIncludeText('3');
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
    wrapper.find(SelectInput).prop('onChange')({ target: { value: 'de' } });
  });

  it('should call setProjectDataLocale', () => {
    expect(props.setProjectDataLocale).toHaveBeenCalledTimes(1);
    expect(props.setProjectDataLocale).toHaveBeenLastCalledWith('de');
  });
});
