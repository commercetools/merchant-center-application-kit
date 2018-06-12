import React from 'react';
import { shallow } from 'enzyme';
import Avatar, {
  getInitialsFromName,
  getAvatarImageUrl,
  GravatarImg,
} from './avatar';

jest.mock('is-retina', () => () => false);

const createTestProps = custom => ({
  firstName: 'Caspar',
  lastName: 'Commercetools',
  gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
  size: 's',
  ...custom,
});

describe('rendering', () => {
  let props;
  let wrapper;

  describe('<Avatar />', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<Avatar {...props} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a <GravatarImg />', () => {
      expect(wrapper).toRender('GravatarImg');
    });

    it('should pass the `email` to <GravatarImg />', () => {
      expect(wrapper.find('GravatarImg')).toHaveProp(
        'hash',
        props.gravatarHash
      );
    });

    it('should pass the `size` to <GravatarImg />', () => {
      expect(wrapper.find('GravatarImg')).toHaveProp('size', props.size);
    });

    it('should pass `firstName` to <Initials />', () => {
      expect(wrapper.find('Initials')).toHaveProp('firstName', 'Caspar');
    });

    it('should pass `lastName` to <Initials />', () => {
      expect(wrapper.find('Initials')).toHaveProp('lastName', 'Commercetools');
    });
  });

  describe('<GravatarImg />', () => {
    describe('with regular email', () => {
      beforeEach(() => {
        wrapper = shallow(
          <GravatarImg hash="20c9c1b252b46ab49d6f7a4cee9c3e68" size="s" />
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('with non-string email', () => {
      beforeEach(() => {
        wrapper = shallow(<GravatarImg email={null} size="s" />);
      });

      it('should match render nothing', () => {
        expect(wrapper).toBeEmptyRender();
      });
    });
  });
});

describe('helper', () => {
  describe('generateInitialsFromName', () => {
    let subject;

    describe('with standard options', () => {
      beforeEach(() => {
        subject = getInitialsFromName({
          firstName: 'Caspar',
          lastName: 'Commercetools',
        });
      });

      it('should return "CC"', () => {
        expect(subject).toEqual('CC');
      });
    });

    describe('with empty strings', () => {
      beforeEach(() => {
        subject = getInitialsFromName({
          firstName: '',
          lastName: '',
        });
      });

      it('should return an empty string', () => {
        expect(subject).toEqual('');
      });
    });

    describe('with non string-inputs', () => {
      beforeEach(() => {
        subject = getInitialsFromName({
          firstName: 50,
          lastName: null,
        });
      });

      it('should return an empty string', () => {
        expect(subject).toEqual('');
      });
    });
  });

  describe('getAvatarImageUrl', () => {
    let subject;

    describe('with standard options', () => {
      beforeEach(() => {
        subject = getAvatarImageUrl('s')('20c9c1b252b46ab49d6f7a4cee9c3e68');
      });

      it('should contain the hashed email', () => {
        expect(subject).toContain('20c9c1b252b46ab49d6f7a4cee9c3e68');
      });

      it('should contain the small size', () => {
        expect(subject).toContain('s=26');
      });

      it('should contain the fallback for a blank image', () => {
        expect(subject).toContain('d=blank');
      });
    });

    describe('with size `big`', () => {
      beforeEach(() => {
        subject = getAvatarImageUrl('l')('20c9c1b252b46ab49d6f7a4cee9c3e68');
      });

      it('should contain the hashed email', () => {
        expect(subject).toContain('20c9c1b252b46ab49d6f7a4cee9c3e68');
      });

      it('should contain the big size', () => {
        expect(subject).toContain('s=200');
      });

      it('should contain the fallback for a blank image', () => {
        expect(subject).toContain('d=blank');
      });
    });
  });
});
