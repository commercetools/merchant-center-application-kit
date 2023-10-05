import { screen, render, waitFor } from '@testing-library/react';
import { STORAGE_KEYS } from '@commercetools-frontend/constants';
import ProjectDataLocale from './project-data-locale';

beforeEach(() => {
  window.localStorage.setItem.mockClear();
  window.localStorage.getItem.mockClear();
  window.localStorage.removeItem.mockClear();
});

describe('rendering', () => {
  describe('when selected locale is cached', () => {
    describe('when cached locale is a known project locale', () => {
      it('should render with cached value', async () => {
        window.localStorage.getItem.mockReturnValue('de');
        render(
          <ProjectDataLocale locales={['en', 'de']}>
            {({ locale }) => <span>{`Locale: ${locale}`}</span>}
          </ProjectDataLocale>
        );
        await screen.findByText('Locale: de');
      });
    });
    describe('when cached locale is not in the list of project locales', () => {
      it('should render with first locale from the project list and cache it', async () => {
        window.localStorage.getItem.mockReturnValue('it');
        render(
          <ProjectDataLocale locales={['en', 'de']}>
            {({ locale }) => <span>{`Locale: ${locale}`}</span>}
          </ProjectDataLocale>
        );
        await screen.findByText('Locale: en');
        await waitFor(() => {
          expect(window.localStorage.setItem).toHaveBeenCalledWith(
            STORAGE_KEYS.SELECTED_DATA_LOCALE,
            'en'
          );
        });
      });
    });
  });
  describe('when selected locale is not cached', () => {
    it('should render with first locale from the project list and cache it', async () => {
      window.localStorage.getItem.mockReturnValue(undefined);
      render(
        <ProjectDataLocale locales={['en', 'de']}>
          {({ locale }) => <span>{`Locale: ${locale}`}</span>}
        </ProjectDataLocale>
      );
      await screen.findByText('Locale: en');
      await waitFor(() => {
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
          STORAGE_KEYS.SELECTED_DATA_LOCALE,
          'en'
        );
      });
    });
  });
});
