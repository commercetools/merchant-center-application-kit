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
  it('should contain the copyright text', () => {
    const date = new Date().getUTCFullYear();
    expect(wrapper.find('TextBody').at(1)).toHaveProp(
      'children',
      `${date} © commercetools`
    );
  });
});
