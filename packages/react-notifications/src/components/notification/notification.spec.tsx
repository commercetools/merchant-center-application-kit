import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import Notification, { Props } from './notification';

const TestComponent = () => <div />;

type CustomDataAttributes = {
  'data-track-component': string;
  'data-track-label': string;
  'data-track-event': string;
  'data-test': string;
};

const createTestProps = (
  props: Partial<Props & CustomDataAttributes> = {}
) => ({
  children: <TestComponent />,
  domain: NOTIFICATION_DOMAINS.SIDE,
  type: NOTIFICATION_KINDS_SIDE.warning,
  onCloseClick: jest.fn(),
  ...props,
});

describe('rendering', () => {
  let wrapper: ShallowWrapper;
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
