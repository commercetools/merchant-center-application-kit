import React from 'react';
import { shallow } from 'enzyme';
import { SetProjectDataLocale } from './project-data-locale';

describe('rendering', () => {
  let wrapper;

  describe('Provider', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SetProjectDataLocale locale="de">
          <div />
        </SetProjectDataLocale>
      );
    });
    it('should pass value "de" to Provider', () => {
      expect(wrapper).toRender({ value: 'de' });
    });
  });
  // TODO: we can write some functional tests using mount
  // as soon as the new changes of the enzyme adapter are released.
  // https://github.com/airbnb/enzyme/pull/1513
});
