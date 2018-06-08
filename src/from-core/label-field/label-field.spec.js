import React from 'react';
import { shallow } from 'enzyme';
import RequiredIndicator from '../required-indicator';
import LabelField from './label-field';

const createTestProps = props => ({
  ...props,
});

describe('rendering', () => {
  describe('non required labels', () => {
    const props = createTestProps({ title: 'Title', subtitle: 'Subtitle' });
    const wrapper = shallow(<LabelField {...props} />);
    it('contains a label field', () => {
      expect(wrapper.find('label').type()).toBe('label');
    });

    it('has two children when defining title/subtitle', () => {
      expect(wrapper.children()).toHaveLength(2);
    });

    it('has the title and subtitle as text', () => {
      expect(wrapper.text()).toBe(props.title + props.subtitle);
    });
  });

  describe('required labels', () => {
    const props = createTestProps({
      title: 'Title',
      subtitle: 'Subtitle',
      isRequired: true,
    });
    const wrapper = shallow(<LabelField {...props} />);
    it('contains an * in the label when set as required', () => {
      expect(wrapper).toRender(RequiredIndicator);
    });
  });
});
