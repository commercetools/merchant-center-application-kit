import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ProjectExtensionProviderForImageRegex } from './project-extension-image-regex';

describe('rendering', () => {
  let wrapper: ShallowWrapper;

  describe('Provider', () => {
    describe('when data is not defined yet', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ProjectExtensionProviderForImageRegex>
            <div />
          </ProjectExtensionProviderForImageRegex>
        ).renderProp('children')({ loading: true, data: undefined });
      });
      it('should pass value object with "isLoading" state "true" to Provider', () => {
        expect(wrapper).toHaveProp(
          'value',
          expect.objectContaining({ isLoading: true })
        );
      });
      it('should pass value object with "imageRegex" undefined to Provider', () => {
        expect(wrapper).toHaveProp(
          'value',
          expect.objectContaining({ imageRegex: undefined })
        );
      });
    });
    describe('when data is defined', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ProjectExtensionProviderForImageRegex>
            <div />
          </ProjectExtensionProviderForImageRegex>
        ).renderProp('children')({
          loading: false,
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
      it('should pass value object with "isLoading" state "false" to Provider', () => {
        expect(wrapper).toHaveProp(
          'value',
          expect.objectContaining({ isLoading: false })
        );
      });
      it('should pass value object with "imageRegex" to Provider', () => {
        expect(wrapper).toHaveProp(
          'value',
          expect.objectContaining({
            imageRegex: {
              thumb: {
                flag: 'gi',
                replace: '-thumb.jpg',
                search: '.[^.]+$',
              },
            },
          })
        );
      });
    });
  });
  // TODO: we can write some functional tests using mount
  // as soon as the new changes of the enzyme adapter are released.
  // https://github.com/airbnb/enzyme/pull/1513
});
