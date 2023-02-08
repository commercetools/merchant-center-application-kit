import { ThemeProvider } from '@commercetools-uikit/design-system';
import type { ReactNode } from 'react';
import { screen, renderComponent } from '../../../test-utils';
import PageContentWide, { type TPageContentWide } from './page-content-wide';

const renderPageContent = (
  children: ReactNode | ReactNode[],
  columns?: TPageContentWide['columns']
) => {
  renderComponent(
    <>
      <ThemeProvider theme="test" />
      <PageContentWide columns={columns || '1'}>{children}</PageContentWide>
    </>
  );
};

describe('PageContentWide', () => {
  describe('when using 1 column', () => {
    it('should render single column', () => {
      renderPageContent(<div>Text content</div>);

      screen.getByText('Text content');
    });
    it('should render single column with several children', () => {
      renderPageContent([
        <div key="1">1. Text content</div>,
        <div key="2">2. Text content</div>,
        <div key="3">3. Text content</div>,
      ]);

      screen.getByText('1. Text content');
      screen.getByText('2. Text content');
      screen.getByText('3. Text content');
    });
  });

  describe('when using 1/1 two columns', () => {
    it('should render both columns', () => {
      renderPageContent(
        [
          <div key="1">1. Text content</div>,
          <div key="2">2. Text content</div>,
        ],
        '1/1'
      );
      screen.getByText('1. Text content');
      screen.getByText('2. Text content');
    });
    it('should render if just one column is provided', () => {
      renderPageContent([<div key="1">1. Text content</div>], '1/1');
      screen.getByText('1. Text content');
    });
    it('should render two columns even when provided more', () => {
      renderPageContent(
        [
          <div key="1">1. Text content</div>,
          <div key="2">2. Text content</div>,
          <div key="3">3. Text content</div>,
        ],
        '1/1'
      );

      screen.getByText('1. Text content');
      screen.getByText('2. Text content');
      expect(screen.queryByText('3. Text content')).not.toBeInTheDocument();
    });
  });

  describe('when using 2/1 two columns', () => {
    it('should render both columns', () => {
      renderPageContent(
        [
          <div key="1">1. Text content</div>,
          <div key="2">2. Text content</div>,
        ],
        '2/1'
      );
      screen.getByText('1. Text content');
      screen.getByText('2. Text content');
    });
    it('should render if just one column is provided', () => {
      renderPageContent([<div key="1">1. Text content</div>], '2/1');
      screen.getByText('1. Text content');
    });
    it('should render two columns even when provided more', () => {
      renderPageContent(
        [
          <div key="1">1. Text content</div>,
          <div key="2">2. Text content</div>,
          <div key="3">3. Text content</div>,
        ],
        '2/1'
      );

      screen.getByText('1. Text content');
      screen.getByText('2. Text content');
      expect(screen.queryByText('3. Text content')).not.toBeInTheDocument();
    });
  });
});
