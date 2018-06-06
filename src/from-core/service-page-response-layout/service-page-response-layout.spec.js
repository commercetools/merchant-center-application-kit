import React from 'react';
import { shallow } from 'enzyme';
import ServicePageResponseLayout from './service-page-response-layout';

const createTestProps = props => ({
  imageSrc: '/assets/foo.svg',
  title: <div>{'title'}</div>,
  paragraph1: <div>{'title 1'}</div>,
  ...props,
});

describe('rendering', () => {
  describe('with only 1 paragraph', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ServicePageResponseLayout {...props} />);
    });
    it('outputs correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('with both paragraphs', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps({
        paragraph2: <div>{'title 2'}</div>,
      });
      wrapper = shallow(<ServicePageResponseLayout {...props} />);
    });
    it('outputs correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('with both paragraphs and a body content in between', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps({
        paragraph2: <div>{'title 2'}</div>,
        bodyContent: <div>{'content'}</div>,
      });
      wrapper = shallow(<ServicePageResponseLayout {...props} />);
    });
    it('outputs correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('with only one paragraph and the body content', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps({
        bodyContent: <div>{'content'}</div>,
      });
      wrapper = shallow(<ServicePageResponseLayout {...props} />);
    });
    it('outputs correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
