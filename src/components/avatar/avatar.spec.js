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
  email: 'caspar@commercetools.de',
  size: 'small',
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
      expect(wrapper.find('GravatarImg')).toHaveProp('email', props.email);
    });

    it('should pass the `size` to <GravatarImg />', () => {
      expect(wrapper.find('GravatarImg')).toHaveProp('size', props.size);
    });

    it('should render a <Initials /> with the expected text', () => {
      expect(wrapper.find('Initials')).toHaveProp('text', 'CC');
    });
  });

  describe('<GravatarImg />', () => {
    describe('with regular email', () => {
      beforeEach(() => {
        wrapper = shallow(
          <GravatarImg email="caspar@commercetools.de" size="small" />
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('with non-string email', () => {
      beforeEach(() => {
        wrapper = shallow(<GravatarImg email={null} size="small" />);
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
        subject = getAvatarImageUrl('small')('caspar@commercetools.de');
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

    describe('with lower-/uppercase email-address', () => {
      beforeEach(() => {
        subject = getAvatarImageUrl('small')('Caspar@comMercetools.dE');
      });

      it('should contain the hashed email', () => {
        expect(subject).toContain('20c9c1b252b46ab49d6f7a4cee9c3e68');
      });
    });

    describe('with untrimmed whitespace', () => {
      beforeEach(() => {
        subject = getAvatarImageUrl('small')('    caspar@commercetools.de    ');
      });

      it('should contain the hashed email', () => {
        expect(subject).toContain('20c9c1b252b46ab49d6f7a4cee9c3e68');
      });
    });

    describe('with size `big`', () => {
      beforeEach(() => {
        subject = getAvatarImageUrl('big')('caspar@commercetools.de');
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
