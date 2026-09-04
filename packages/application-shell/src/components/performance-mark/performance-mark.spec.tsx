import { render } from '@testing-library/react';
import { markOnce, PERFORMANCE_MARKS } from '../../utils';
import PerformanceMark from './performance-mark';

// `markOnce` is mocked so each test is independent. The real `markOnce` keeps
// its dedupe `Set` at module scope, and resetting that per test is not possible
// from here without also resetting React. The dedupe behaviour is covered
// directly in `utils/performance-marks/performance-marks.spec.ts`; this file
// only checks that the component calls it correctly.
jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  markOnce: jest.fn(),
}));

const markOnceMock = markOnce as jest.Mock;

describe('PerformanceMark', () => {
  beforeEach(() => {
    markOnceMock.mockClear();
  });

  it('renders nothing', () => {
    const { container } = render(
      <PerformanceMark mark={PERFORMANCE_MARKS.INTL_READY} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('marks on mount using the given name', () => {
    render(<PerformanceMark mark={PERFORMANCE_MARKS.HYDRATION_USER} />);

    expect(markOnceMock).toHaveBeenCalledTimes(1);
    expect(markOnceMock).toHaveBeenCalledWith('mc:hydration-user');
  });

  it('does not mark again on re-render', () => {
    const { rerender } = render(
      <PerformanceMark mark={PERFORMANCE_MARKS.CONTENT_RENDERED} />
    );

    rerender(<PerformanceMark mark={PERFORMANCE_MARKS.CONTENT_RENDERED} />);
    rerender(<PerformanceMark mark={PERFORMANCE_MARKS.CONTENT_RENDERED} />);

    expect(markOnceMock).toHaveBeenCalledTimes(1);
  });

  it('marks again when the name changes', () => {
    const { rerender } = render(
      <PerformanceMark mark={PERFORMANCE_MARKS.HYDRATION_USER} />
    );

    rerender(<PerformanceMark mark={PERFORMANCE_MARKS.HYDRATION_PROJECT} />);

    expect(markOnceMock).toHaveBeenNthCalledWith(1, 'mc:hydration-user');
    expect(markOnceMock).toHaveBeenNthCalledWith(2, 'mc:hydration-project');
  });

  // The shell subtree this component lives in mounts twice on a cold load: the
  // Suspense fallback in `application-shell-splitter.async.tsx` is
  // `props.children`, the same subtree that later renders inside the resolved
  // splitter. The component calls `markOnce` on each mount by design; keeping
  // only the first write is `markOnce`'s job, verified in its own spec.
  it('calls markOnce on every mount and lets it deduplicate', () => {
    const mark = PERFORMANCE_MARKS.SHELL_CHROME_MOUNTED;

    const first = render(<PerformanceMark mark={mark} />);
    first.unmount();
    render(<PerformanceMark mark={mark} />);

    expect(markOnceMock).toHaveBeenCalledTimes(2);
    expect(markOnceMock).toHaveBeenCalledWith('mc:shell-chrome-mounted');
  });
});
