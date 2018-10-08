import React from 'react';
import { shallow } from 'enzyme';
import { Notification } from './notification';

const TestComponent = () => <div />;

const createTestProps = props => ({
  children: <TestComponent />,
  domain: 'side',
  type: 'warning',
  fixed: true,
  intl: {
    formatMessage: jest.fn(message => message.id),
  },
  ...props,
});

describe('rendering', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<Notification {...props} />);
  });

  it('should render children', () => {
    expect(wrapper).toRender(TestComponent);
  });

  describe('with data-* props', () => {
    beforeEach(() => {
      props = createTestProps({
        'data-track-component': 'Notification',
        'data-track-label': 'Notification',
        'data-track-event': 'click',
        'data-test': 'notification',
      });
      wrapper = shallow(<Notification {...props} />);
    });
    it('should apply given `data-track-component` to Notification', () => {
      expect(wrapper).toHaveProp(
        'data-track-component',
        expect.stringMatching('Notification')
      );
    });
    it('should apply given `data-track-event` to Notification', () => {
      expect(wrapper).toHaveProp(
        'data-track-event',
        expect.stringMatching('click')
      );
    });
    it('should apply given `data-track-label` to Notification', () => {
      expect(wrapper).toHaveProp(
        'data-track-label',
        expect.stringMatching('Notification')
      );
    });
    it('should apply given `data-test` to Notification', () => {
      expect(wrapper).toHaveProp(
        'data-test',
        expect.stringMatching('notification')
      );
    });
  });
});
