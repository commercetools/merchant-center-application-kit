import React from 'react';
import { render } from '../../../test-utils';
import MaintenancePageLayout, { Props } from './maintenance-page-layout';

const createTestProps = (props: Partial<Props> = {}) => ({
  imageSrc: '/assets/foo.svg',
  title: 'title',
  paragraph1: 'title 1',
  ...props,
});

describe('rendering', () => {
  let props: Props;
  describe('with only 1 paragraph', () => {
    beforeEach(() => {
      props = createTestProps();
    });
    it('renders the title and paragraph', () => {
      const { getByText } = render(<MaintenancePageLayout {...props} />);
      expect(getByText('title')).toBeInTheDocument();
      expect(getByText('title 1')).toBeInTheDocument();
    });
  });
  describe('with both paragraphs', () => {
    beforeEach(() => {
      props = createTestProps({
        paragraph2: 'title 2',
      });
    });
    it('renders the title and paragraphs', () => {
      const { getByText } = render(<MaintenancePageLayout {...props} />);
      expect(getByText('title')).toBeInTheDocument();
      expect(getByText('title 1')).toBeInTheDocument();
      expect(getByText('title 2')).toBeInTheDocument();
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
      const { getByText } = render(<MaintenancePageLayout {...props} />);
      expect(getByText('title')).toBeInTheDocument();
      expect(getByText('title 1')).toBeInTheDocument();
      expect(getByText('title 2')).toBeInTheDocument();
      expect(getByText('content')).toBeInTheDocument();
    });
  });
  describe('with only one paragraph and the body content', () => {
    beforeEach(() => {
      props = createTestProps({
        bodyContent: 'content',
      });
    });
    it('renders the title, paragraphs and body content', () => {
      const { getByText } = render(<MaintenancePageLayout {...props} />);
      expect(getByText('title')).toBeInTheDocument();
      expect(getByText('title 1')).toBeInTheDocument();
      expect(getByText('content')).toBeInTheDocument();
    });
  });
});
