import React from 'react';
import { render } from '@testing-library/react';
import { STORAGE_KEYS } from '../../constants';
import ProjectDataLocale from './project-data-locale';
import { wait } from '@apollo/client/testing';

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
        const rendered = render(
          <ProjectDataLocale locales={['en', 'de']}>
            {({ locale }) => <span>{`Locale: ${locale}`}</span>}
          </ProjectDataLocale>
        );
        await rendered.findByText('Locale: de');
      });
    });
    describe('when cached locale is not in the list of project locales', () => {
      it('should render with first locale from the project list and cache it', async () => {
        window.localStorage.getItem.mockReturnValue('it');
        const rendered = render(
          <ProjectDataLocale locales={['en', 'de']}>
            {({ locale }) => <span>{`Locale: ${locale}`}</span>}
          </ProjectDataLocale>
        );
        await rendered.findByText('Locale: en');
        await wait(() => {
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
      const rendered = render(
        <ProjectDataLocale locales={['en', 'de']}>
          {({ locale }) => <span>{`Locale: ${locale}`}</span>}
        </ProjectDataLocale>
      );
      await rendered.findByText('Locale: en');
      await wait(() => {
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
          STORAGE_KEYS.SELECTED_DATA_LOCALE,
          'en'
        );
      });
    });
  });
});
