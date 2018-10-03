import React from 'react';
import { shallow } from 'enzyme';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { ConfigurationConsumer } from '@commercetools-frontend/application-shell-connectors';
import { SetupFlopFlipProvider } from './setup-flop-flip-provider';

const createTestProps = props => ({
  user: {
    id: 'u1',
    launchdarklyTrackingId: '123',
    launchdarklyTrackingGroup: 'ct',
    launchdarklyTrackingTeam: ['abc', 'def'],
    launchdarklyTrackingTenant: 'xy',
  },
  defaultFlags: {
    flagA: true,
  },
  children: <div />,
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<SetupFlopFlipProvider {...props} />)
      .find(ConfigurationConsumer)
      .renderProp('children', 'staging');
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render <ConfigureFlopFlip>', () => {
    expect(wrapper).toRender(ConfigureFlopFlip);
  });
  it('should pass staging "clientSideId" as adapter arg', () => {
    expect(wrapper.find(ConfigureFlopFlip)).toHaveProp(
      'adapterArgs',
      expect.objectContaining({
        clientSideId: '5979d95f6040390cd07b5e00',
      })
    );
  });
  it('should pass "user.key" as adapter arg', () => {
    expect(wrapper.find(ConfigureFlopFlip)).toHaveProp(
      'adapterArgs',
      expect.objectContaining({
        user: expect.objectContaining({
          key: props.user.id,
        }),
      })
    );
  });
  it('should pass "user.custom.id" as adapter arg', () => {
    expect(wrapper.find(ConfigureFlopFlip)).toHaveProp(
      'adapterArgs',
      expect.objectContaining({
        user: expect.objectContaining({
          custom: expect.objectContaining({
            id: props.user.launchdarklyTrackingId,
          }),
        }),
      })
    );
  });
  it('should pass "user.custom.group" as adapter arg', () => {
    expect(wrapper.find(ConfigureFlopFlip)).toHaveProp(
      'adapterArgs',
      expect.objectContaining({
        user: expect.objectContaining({
          custom: expect.objectContaining({
            group: props.user.launchdarklyTrackingGroup,
          }),
        }),
      })
    );
  });
  it('should pass "user.custom.team" as adapter arg', () => {
    expect(wrapper.find(ConfigureFlopFlip)).toHaveProp(
      'adapterArgs',
      expect.objectContaining({
        user: expect.objectContaining({
          custom: expect.objectContaining({
            team: props.user.launchdarklyTrackingTeam,
          }),
        }),
      })
    );
  });
  it('should pass "user.custom.tenant" as adapter arg', () => {
    expect(wrapper.find(ConfigureFlopFlip)).toHaveProp(
      'adapterArgs',
      expect.objectContaining({
        user: expect.objectContaining({
          custom: expect.objectContaining({
            tenant: props.user.launchdarklyTrackingTenant,
          }),
        }),
      })
    );
  });
  describe('when user is not defined', () => {
    beforeEach(() => {
      props = createTestProps({ user: null });
      wrapper = shallow(<SetupFlopFlipProvider {...props} />)
        .find(ConfigurationConsumer)
        .renderProp('children', 'staging');
    });
    it('should set "shouldDeferAdapterConfiguration" to true', () => {
      expect(wrapper.find(ConfigureFlopFlip)).toHaveProp(
        'shouldDeferAdapterConfiguration',
        true
      );
    });
  });
  describe('when user is defined', () => {
    it('should set "shouldDeferAdapterConfiguration" to false', () => {
      expect(wrapper.find(ConfigureFlopFlip)).toHaveProp(
        'shouldDeferAdapterConfiguration',
        false
      );
    });
  });
  describe('when env is production', () => {
    beforeEach(() => {
      wrapper = shallow(<SetupFlopFlipProvider {...props} />)
        .find(ConfigurationConsumer)
        .renderProp('children', 'production');
    });
    it('should pass production "clientSideId" as adapter arg', () => {
      expect(wrapper.find(ConfigureFlopFlip)).toHaveProp(
        'adapterArgs',
        expect.objectContaining({
          clientSideId: '5979d95f6040390cd07b5e01',
        })
      );
    });
  });
});
