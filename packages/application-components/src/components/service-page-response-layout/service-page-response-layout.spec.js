import React from 'react';
import { render } from '@commercetools-frontend/application-shell/test-utils';
import ServicePageResponseLayout from './service-page-response-layout';

const createTestProps = props => ({
  imageSrc: '/assets/foo.svg',
  title: 'title',
  paragraph1: 'title 1',
  ...props,
});

describe('rendering', () => {
  let props;
  describe('with only 1 paragraph', () => {
    beforeEach(() => {
      props = createTestProps();
    });
    it('renders the title and paragraph', () => {
      const { getByText } = render(<ServicePageResponseLayout {...props} />);
      expect(getByText(props.title)).toBeInTheDocument();
      expect(getByText(props.paragraph1)).toBeInTheDocument();
    });
  });
  describe('with both paragraphs', () => {
    beforeEach(() => {
      props = createTestProps({
        paragraph2: 'title 2',
      });
    });
    it('renders the title and paragraphs', () => {
      const { getByText } = render(<ServicePageResponseLayout {...props} />);
      expect(getByText(props.title)).toBeInTheDocument();
      expect(getByText(props.paragraph1)).toBeInTheDocument();
      expect(getByText(props.paragraph2)).toBeInTheDocument();
    });
  });
  describe('with both paragraphs and a body content in between', () => {
    beforeEach(() => {
      props = createTestProps({
        paragraph2: 'title 2',
        bodyContent: 'content',
      });
    });
    it('renders the title, paragraphs and body content', () => {
      const { getByText } = render(<ServicePageResponseLayout {...props} />);
      expect(getByText(props.title)).toBeInTheDocument();
      expect(getByText(props.paragraph1)).toBeInTheDocument();
      expect(getByText(props.paragraph2)).toBeInTheDocument();
      expect(getByText(props.bodyContent)).toBeInTheDocument();
    });
  });
  describe('with only one paragraph and the body content', () => {
    beforeEach(() => {
      props = createTestProps({
        bodyContent: 'content',
      });
    });
    it('renders the title, paragraphs and body content', () => {
      const { getByText } = render(<ServicePageResponseLayout {...props} />);
      expect(getByText(props.title)).toBeInTheDocument();
      expect(getByText(props.paragraph1)).toBeInTheDocument();
      expect(getByText(props.bodyContent)).toBeInTheDocument();
    });
  });
});
