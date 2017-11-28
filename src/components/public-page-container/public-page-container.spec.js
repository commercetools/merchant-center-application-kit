import React from 'react';
import { shallow } from 'enzyme';
import PublicPageContainer from './public-page-container';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    const Foo = () => <div />;
    wrapper = shallow(
      <PublicPageContainer>
        <Foo />
      </PublicPageContainer>
    );
  });
  it('should render the PortalsContainer', () => {
    expect(wrapper).toRender('PortalsContainer');
  });
  it('should render children', () => {
    expect(wrapper).toRender('Foo');
  });
  it('should render the copyright', () => {
    expect(wrapper).toRender('.copyright');
    const date = new Date().getUTCFullYear();
    expect(wrapper.contains(`${date} © commercetools`)).toBe(true);
  });
});
