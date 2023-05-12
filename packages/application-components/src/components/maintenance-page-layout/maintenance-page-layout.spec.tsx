import { screen, renderComponent } from '../../test-utils';
import type { Props } from './maintenance-page-layout';

import MaintenancePageLayout from './maintenance-page-layout';

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
      renderComponent(<MaintenancePageLayout {...props} />);
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('title 1')).toBeInTheDocument();
    });
  });
  describe('with both paragraphs', () => {
    beforeEach(() => {
      props = createTestProps({
        paragraph2: 'title 2',
      });
    });
    it('renders the title and paragraphs', () => {
      renderComponent(<MaintenancePageLayout {...props} />);
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('title 1')).toBeInTheDocument();
      expect(screen.getByText('title 2')).toBeInTheDocument();
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
      renderComponent(<MaintenancePageLayout {...props} />);
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('title 1')).toBeInTheDocument();
      expect(screen.getByText('title 2')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });
  describe('with only one paragraph and the body content', () => {
    beforeEach(() => {
      props = createTestProps({
        bodyContent: 'content',
      });
    });
    it('renders the title, paragraphs and body content', () => {
      renderComponent(<MaintenancePageLayout {...props} />);
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('title 1')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });
  describe('with label', () => {
    beforeEach(() => {
      props = createTestProps({ label: 'page label' });
    });
    it('renders the label as an alt of the image', () => {
      renderComponent(<MaintenancePageLayout {...props} />);
      expect(
        screen.getByRole('img', { name: props.label })
      ).toBeInTheDocument();
    });
  });
});
