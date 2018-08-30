import React from 'react';
import { shallow } from 'enzyme';
import { ProjectExtensionProviderForCategoryRecommendationSettings } from './project-extension-category-recommendation-settings';

describe('rendering', () => {
  let wrapper;

  describe('Provider', () => {
    describe('when data is not defined yet', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ProjectExtensionProviderForCategoryRecommendationSettings>
            <div />
          </ProjectExtensionProviderForCategoryRecommendationSettings>
        ).renderProp('children', { loading: true, data: undefined });
      });
      it('should pass value object with "loading" state "true" to Provider', () => {
        expect(wrapper).toHaveProp(
          'value',
          expect.objectContaining({ loading: true })
        );
      });
      it('should pass value object with "categoryRecommendationSettings" undefined to Provider', () => {
        expect(wrapper).toHaveProp(
          'value',
          expect.objectContaining({ categoryRecommendationSettings: undefined })
        );
      });
    });
    describe('when data is defined', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ProjectExtensionProviderForCategoryRecommendationSettings>
            <div />
          </ProjectExtensionProviderForCategoryRecommendationSettings>
        ).renderProp('children', {
          loading: false,
          data: {
            projectExtension: {
              categoryRecommendationSettings: {
                searchProperty: 'ProductType',
              },
            },
          },
        });
      });
      it('should pass value object with "loading" state "false" to Provider', () => {
        expect(wrapper).toHaveProp(
          'value',
          expect.objectContaining({ loading: false })
        );
      });
      it('should pass value object with "categoryRecommendationSettings" to Provider', () => {
        expect(wrapper).toHaveProp(
          'value',
          expect.objectContaining({
            categoryRecommendationSettings: {
              searchProperty: 'ProductType',
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
