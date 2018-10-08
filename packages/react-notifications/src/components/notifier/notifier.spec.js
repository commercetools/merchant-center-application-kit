import React from 'react';
import { shallow } from 'enzyme';
import { DOMAINS } from '@commercetools-frontend/constants';
import { Notifier } from './notifier';

const createTestProps = custom => ({
  showNotification: jest.fn(() => ({ dismiss: jest.fn() })),
  domain: DOMAINS.SIDE,
  kind: 'success',
  text: 'foo',
  ...custom,
});

describe('when the Notifier mounts', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<Notifier {...props} />);
    wrapper.instance().componentDidMount();
  });
  it('should dispatch a notification', () => {
    expect(props.showNotification).toHaveBeenCalledWith(
      {
        domain: 'side',
        kind: 'success',
        text: 'foo',
      },
      undefined
    );
  });
});

describe('when the Notifier mounts with meta information', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps({
      dismissAfter: 500,
      meta: { foo: true },
    });
    wrapper = shallow(<Notifier {...props} />);
    wrapper.instance().componentDidMount();
  });
  it('should dispatch a notification', () => {
    expect(props.showNotification).toHaveBeenCalledWith(
      {
        domain: 'side',
        kind: 'success',
        text: 'foo',
      },
      { dismissAfter: 500, foo: true }
    );
  });
});

describe('when the Notifier unmounts', () => {
  let props;
  let wrapper;
  let dismiss;
  beforeEach(() => {
    dismiss = jest.fn();
    props = createTestProps({
      showNotification: jest.fn(() => ({ dismiss })),
    });
    wrapper = shallow(<Notifier {...props} />);
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillUnmount();
  });

  it('should hide the notification', () => {
    expect(dismiss).toHaveBeenCalled();
  });
});
