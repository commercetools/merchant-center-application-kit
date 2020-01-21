import { getIconColor } from './navbar';

describe('helpers', () => {
  describe('getIconColor', () => {
    let iconTheme;
    describe('when isActive is true', () => {
      beforeEach(() => {
        const isActive = true;
        const isAlternativeTheme = false;
        iconTheme = getIconColor(isActive, isAlternativeTheme);
      });
      it('should get green color', () => {
        expect(iconTheme).toBe('primary40');
      });
    });
    describe('when isActive is false', () => {
      describe('when alternative theme is true', () => {
        beforeEach(() => {
          const isActive = false;
          const isAlternativeTheme = true;
          iconTheme = getIconColor(isActive, isAlternativeTheme);
        });
        it('should get grey theme', () => {
          expect(iconTheme).toBe('neutral60');
        });
      });
      describe('when alternative theme is false', () => {
        beforeEach(() => {
          const isActive = false;
          const isAlternativeTheme = false;
          iconTheme = getIconColor(isActive, isAlternativeTheme);
        });
        it('should get white theme', () => {
          expect(iconTheme).toBe('surface');
        });
      });
    });
  });
});
