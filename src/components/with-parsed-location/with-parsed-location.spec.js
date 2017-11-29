import React from 'react';
import { shallow } from 'enzyme';
import withParsedLocation from './with-parsed-location';

const createTestProps = props => ({
  location: {
    hash: '',
    search: '',
  },
  ...props,
});

const Foo = () => <div />;
Foo.displayName = 'Foo';

describe('rendering', () => {
  let props;
  let wrapper;
  describe('when hash and search are defined', () => {
    beforeEach(() => {
      props = createTestProps({
        location: { search: '?name=john', hash: '#age=100' },
      });
      const Wrapped = withParsedLocation(Foo);
      wrapper = shallow(<Wrapped {...props} />);
    });
    it('should parse name as prop', () => {
      expect(wrapper).toHaveProp(
        'locationParams',
        expect.objectContaining({ name: 'john' })
      );
    });
    it('should parse age as prop', () => {
      expect(wrapper).toHaveProp(
        'locationParams',
        expect.objectContaining({ age: '100' })
      );
    });
  });
  describe('when no hash nor search are defined', () => {
    beforeEach(() => {
      props = createTestProps();
      const Wrapped = withParsedLocation(Foo);
      wrapper = shallow(<Wrapped {...props} />);
    });
    it('should pass empty object as locationParams', () => {
      expect(wrapper).toHaveProp('locationParams', {});
    });
  });
});
