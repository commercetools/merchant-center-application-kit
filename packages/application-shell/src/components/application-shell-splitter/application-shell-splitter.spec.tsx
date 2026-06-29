import { render, act } from '@testing-library/react';
import ApplicationShellSplitter from './application-shell-splitter';

const mockCapturedProps: Record<string, Record<string, unknown>> = {};
let mockLastOnCollapsedChange: ((collapsed: boolean) => void) | undefined;
let mockHookOptions: Record<string, unknown> = {};

jest.mock('@commercetools/nimbus', () => {
  return {
    NimbusProvider: ({ children }: { children: unknown }) => <>{children}</>,
    Splitter: {
      Root: (p: { children: unknown }) => {
        const { children, ...rest } = p as Record<string, unknown>;
        mockCapturedProps['Splitter.Root'] = rest;
        return <div data-testid="splitter-root">{children as never}</div>;
      },
      Main: (p: { children: unknown }) => {
        const { children, ...rest } = p as Record<string, unknown>;
        mockCapturedProps['Splitter.Main'] = rest;
        return <div data-testid="splitter-main">{children as never}</div>;
      },
      Handle: (p: Record<string, unknown>) => {
        mockCapturedProps['Splitter.Handle'] = p;
        return <div data-testid="splitter-handle" />;
      },
      Aside: (p: { children: unknown }) => {
        const { children, ...rest } = p as Record<string, unknown>;
        mockCapturedProps['Splitter.Aside'] = rest;
        return <div data-testid="splitter-aside">{children as never}</div>;
      },
    },
    Region: (p: { name: string; value: unknown }) => {
      mockCapturedProps['Region'] = { value: p.value };
      return <div data-testid="region" />;
    },
    useResponsiveSplitterSizes: (options: Record<string, unknown>) => {
      mockHookOptions = options;
      const onCollapsedChange = (collapsed: boolean) => {
        if (typeof options.onCollapsedChange === 'function') {
          (options.onCollapsedChange as Function)(collapsed);
        }
      };
      mockLastOnCollapsedChange = onCollapsedChange;
      return {
        rootProps: {
          orientation: 'horizontal',
          onCollapsedChange,
          onSizeChangeEnd: jest.fn(),
          ref: { current: null },
        },
      };
    },
  };
});

const defaultProps = {
  locale: 'en',
  navigate: jest.fn(),
};

beforeEach(() => {
  Object.keys(mockCapturedProps).forEach((k) => delete mockCapturedProps[k]);
  mockHookOptions = {};
  mockLastOnCollapsedChange = undefined;
});

type Controller = {
  isCollapsed: boolean;
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
};

const regionValue = () => mockCapturedProps['Region']?.value as Controller;

describe('ApplicationShellSplitter', () => {
  describe('Con 2: containerType via prop, not Global CSS', () => {
    it('sets containerType on Splitter.Main via prop', () => {
      render(
        <ApplicationShellSplitter {...defaultProps}>
          <div>content</div>
        </ApplicationShellSplitter>
      );

      expect(mockCapturedProps['Splitter.Main']).toEqual(
        expect.objectContaining({ containerType: 'inline-size' })
      );
    });
  });

  describe('Con 4: collapse state routed through hook onCollapsedChange', () => {
    it('passes onCollapsedChange to the hook options', () => {
      render(
        <ApplicationShellSplitter {...defaultProps}>
          <div>content</div>
        </ApplicationShellSplitter>
      );

      expect(mockHookOptions).toHaveProperty('onCollapsedChange');
      expect(typeof mockHookOptions.onCollapsedChange).toBe('function');
    });

    it('does not override onCollapsedChange on Splitter.Root', () => {
      render(
        <ApplicationShellSplitter {...defaultProps}>
          <div>content</div>
        </ApplicationShellSplitter>
      );

      const rootOnChange =
        mockCapturedProps['Splitter.Root']?.onCollapsedChange;
      expect(rootOnChange).toBe(mockLastOnCollapsedChange);
    });

    it('updates isCollapsed when hook fires onCollapsedChange', () => {
      render(
        <ApplicationShellSplitter {...defaultProps}>
          <div>content</div>
        </ApplicationShellSplitter>
      );

      expect(regionValue().isCollapsed).toBe(true);

      act(() => {
        mockLastOnCollapsedChange!(false);
      });
      expect(regionValue().isCollapsed).toBe(false);

      act(() => {
        mockLastOnCollapsedChange!(true);
      });
      expect(regionValue().isCollapsed).toBe(true);
    });

    it('programmatic expand/collapse/toggle routes through hook handler', () => {
      render(
        <ApplicationShellSplitter {...defaultProps}>
          <div>content</div>
        </ApplicationShellSplitter>
      );

      act(() => {
        regionValue().expand();
      });
      expect(regionValue().isCollapsed).toBe(false);

      act(() => {
        regionValue().collapse();
      });
      expect(regionValue().isCollapsed).toBe(true);

      act(() => {
        regionValue().toggle();
      });
      expect(regionValue().isCollapsed).toBe(false);

      act(() => {
        regionValue().toggle();
      });
      expect(regionValue().isCollapsed).toBe(true);
    });
  });
});
