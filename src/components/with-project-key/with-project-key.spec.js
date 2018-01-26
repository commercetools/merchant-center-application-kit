import React from 'react';
import { shallow } from 'enzyme';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import WithProjectKey from './with-project-key';

jest.mock('@commercetools-local/utils/storage');

const createTestProps = props => ({
  user: null,
  render: jest.fn(),
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  let renderWrapper;
  beforeEach(() => {
    props = createTestProps({ user: null });
    wrapper = shallow(<WithProjectKey {...props} />);
  });
  it('should render catch-all Route', () => {
    expect(wrapper.find('Route').at(0)).not.toHaveProp('path');
  });
  it('should render Route for "/:projectKey"', () => {
    expect(wrapper).toRender({ path: '/:projectKey' });
  });
  describe('catch-all Route', () => {
    describe('when route does not match "/" or "/account"', () => {
      beforeEach(() => {
        renderWrapper = shallow(
          <div>
            {wrapper
              .find('Route')
              .at(0)
              .prop('render')({
              match: { url: '/foo' },
            })}
          </div>
        );
      });
      it('should render nothing', () => {
        expect(renderWrapper).toContainReact(<div />);
      });
    });
    describe('when route matches "/account"', () => {
      describe('when user is not defined', () => {
        beforeEach(() => {
          renderWrapper = shallow(
            <div>
              {wrapper
                .find('Route')
                .at(0)
                .prop('render')({ match: { url: '/account' } })}
            </div>
          );
        });
        it('should render nothing', () => {
          expect(renderWrapper).toContainReact(<div />);
        });
      });
      describe('when user is defined', () => {
        beforeEach(() => {
          props = createTestProps({
            user: { availableProjects: [{ key: 'p1' }] },
          });
          wrapper = shallow(<WithProjectKey {...props} />);
        });
        describe('when is an "account" route', () => {
          describe('when projectKey is not cached in localStorage', () => {
            describe('when the user has no available projects', () => {
              beforeEach(() => {
                props = createTestProps({ user: { availableProjects: [] } });
                wrapper = shallow(<WithProjectKey {...props} />);
                storage.remove(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
                renderWrapper = shallow(
                  <div>
                    {wrapper
                      .find('Route')
                      .at(0)
                      .prop('render')({
                      match: {
                        url: '/account/profile',
                        params: { projectKey: 'account' },
                      },
                    })}
                  </div>
                );
              });
              it('should render nothing', () => {
                expect(renderWrapper).toContainReact(<div />);
              });
            });
            describe('when user has at least one available project', () => {
              beforeEach(() => {
                wrapper = shallow(<WithProjectKey {...props} />);
                storage.remove(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
                renderWrapper = shallow(
                  <div>
                    {wrapper
                      .find('Route')
                      .at(0)
                      .prop('render')({
                      match: {
                        url: '/account/profile',
                        params: { projectKey: 'account' },
                      },
                    })}
                  </div>
                );
              });
              it('should call render callback with the first project key from the available projects list', () => {
                expect(props.render).toHaveBeenCalledWith(
                  expect.objectContaining({ projectKey: 'p1' })
                );
              });
            });
          });
          describe('when projectKey is cached in localStorage', () => {
            beforeEach(() => {
              storage.put(
                CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY,
                'cached-project-key'
              );
              renderWrapper = shallow(
                <div>
                  {wrapper
                    .find('Route')
                    .at(0)
                    .prop('render')({
                    match: {
                      url: '/account/profile',
                      params: { projectKey: 'account' },
                    },
                  })}
                </div>
              );
            });
            it('should call render callback with the cached project key', () => {
              expect(props.render).toHaveBeenCalledWith(
                expect.objectContaining({ projectKey: 'cached-project-key' })
              );
            });
          });
        });
      });
    });
    describe('when route matches "/"', () => {
      describe('when user is not defined', () => {
        beforeEach(() => {
          renderWrapper = shallow(
            <div>
              {wrapper
                .find('Route')
                .at(0)
                .prop('render')({ match: { url: '/' } })}
            </div>
          );
        });
        it('should render nothing', () => {
          expect(renderWrapper).toContainReact(<div />);
        });
      });
      describe('when user is defined', () => {
        beforeEach(() => {
          props = createTestProps({
            user: { availableProjects: [{ key: 'p1' }] },
          });
          wrapper = shallow(<WithProjectKey {...props} />);
        });
        describe('when projectKey is not cached in localStorage', () => {
          describe('when the user has no available projects', () => {
            beforeEach(() => {
              props = createTestProps({ user: { availableProjects: [] } });
              wrapper = shallow(<WithProjectKey {...props} />);
              storage.remove(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
              renderWrapper = shallow(
                <div>
                  {wrapper
                    .find('Route')
                    .at(0)
                    .prop('render')({
                    match: {
                      url: '/',
                      params: {},
                    },
                  })}
                </div>
              );
            });
            it('should render nothing', () => {
              expect(renderWrapper).toContainReact(<div />);
            });
          });
          describe('when user has at least one available project', () => {
            beforeEach(() => {
              wrapper = shallow(<WithProjectKey {...props} />);
              storage.remove(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
              renderWrapper = shallow(
                <div>
                  {wrapper
                    .find('Route')
                    .at(0)
                    .prop('render')({
                    match: {
                      url: '/',
                      params: {},
                    },
                  })}
                </div>
              );
            });
            it('should call render callback with the first project key from the available projects list', () => {
              expect(props.render).toHaveBeenCalledWith(
                expect.objectContaining({ projectKey: 'p1' })
              );
            });
          });
        });
        describe('when projectKey is cached in localStorage', () => {
          beforeEach(() => {
            storage.put(
              CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY,
              'cached-project-key'
            );
            renderWrapper = shallow(
              <div>
                {wrapper
                  .find('Route')
                  .at(0)
                  .prop('render')({
                  match: {
                    url: '/',
                    params: {},
                  },
                })}
              </div>
            );
          });
          it('should call render callback with the cached project key', () => {
            expect(props.render).toHaveBeenCalledWith(
              expect.objectContaining({ projectKey: 'cached-project-key' })
            );
          });
        });
      });
    });
  });
  describe('Route for "/:projectKey"', () => {
    describe('when user is not defined', () => {
      beforeEach(() => {
        renderWrapper = shallow(
          <div>
            {wrapper.find({ path: '/:projectKey' }).prop('render')({
              match: { params: { projectKey: 'test-1' } },
            })}
          </div>
        );
      });
      it('should render nothing', () => {
        expect(renderWrapper).toContainReact(<div />);
      });
    });
    describe('when user is defined', () => {
      beforeEach(() => {
        props = createTestProps({
          user: { availableProjects: [{ key: 'p1' }] },
        });
        wrapper = shallow(<WithProjectKey {...props} />);
        renderWrapper = shallow(
          <div>
            {wrapper.find({ path: '/:projectKey' }).prop('render')({
              match: { params: { projectKey: 'test-1' } },
            })}
          </div>
        );
      });
      it('should call render callback with matched projectKey', () => {
        expect(props.render).toHaveBeenCalledWith(
          expect.objectContaining({ projectKey: 'test-1' })
        );
      });
    });
  });
});
