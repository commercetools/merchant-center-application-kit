import React from 'react';
import { shallow } from 'enzyme';
import { ProjectExtensionProviderForImageRegex } from './project-extension-image-regex';

describe('rendering', () => {
  let wrapper;

  describe('Provider', () => {
    describe('when data is not defined yet', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ProjectExtensionProviderForImageRegex>
            <div />
          </ProjectExtensionProviderForImageRegex>
        ).renderProp('children', { data: undefined });
      });
      it('should pass undefined value to Provider', () => {
        expect(wrapper).toHaveProp('value', undefined);
      });
    });
    describe('when data is defined', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ProjectExtensionProviderForImageRegex>
            <div />
          </ProjectExtensionProviderForImageRegex>
        ).renderProp('children', {
          data: {
            projectExtension: {
              imageRegex: {
                thumb: {
                  flag: 'gi',
                  replace: '-thumb.jpg',
                  search: '.[^.]+$',
                },
              },
            },
          },
        });
      });
      it('should pass "imageRegex" object to Provider', () => {
        expect(wrapper).toHaveProp('value', {
          thumb: {
            flag: 'gi',
            replace: '-thumb.jpg',
            search: '.[^.]+$',
          },
        });
      });
    });
  });
  // TODO: we can write some functional tests using mount
  // as soon as the new changes of the enzyme adapter are released.
  // https://github.com/airbnb/enzyme/pull/1513
});
