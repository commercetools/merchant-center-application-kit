import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
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
    expect(wrapper.find('TextDetail').at(1)).toHaveProp(
      'children',
      `${date} © commercetools`
    );
  });
  it('should render privacy policy link', () => {
    expect(wrapper.find('TextDetail').at(0)).toHaveProp(
      'children',
      <FormattedMessage
        defaultMessage="Privacy Policy"
        description="The label for privacy policy link"
        id="LoginPage.privacyPolicy"
        values={{}}
      />
    );
  });
});
