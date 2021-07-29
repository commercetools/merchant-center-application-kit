import { renderHook, act } from '@testing-library/react-hooks';
import useModalState from './use-modal-state';

describe('useModalState', () => {
  it('should return a closed modal state by default', () => {
    const { result } = renderHook(() => useModalState());

    expect(result.current.isModalOpen).toBe(false);
  });

  it('should return open modal state when passing "true" as prop', () => {
    const { result } = renderHook(() => useModalState(true));

    expect(result.current.isModalOpen).toBe(true);
  });

  describe('useModalState setters', () => {
    it('should change isModalOpen to true when calling "openModal"', () => {
      const { result } = renderHook(() => useModalState());
      expect(result.current.isModalOpen).toBe(false);
      act(() => result.current.openModal());
      expect(result.current.isModalOpen).toBe(true);
    });

    it('should change isModalOpen to false when calling "closeModal"', () => {
      const { result } = renderHook(() => useModalState());
      act(() => result.current.openModal());
      expect(result.current.isModalOpen).toBe(true);
      act(() => result.current.closeModal());
      expect(result.current.isModalOpen).toBe(false);
    });
  });
});
