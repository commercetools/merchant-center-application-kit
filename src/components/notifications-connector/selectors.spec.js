import { DOMAINS } from '@commercetools-frontend/constants';
import {
  isNotificationVisible,
  selectGlobalNotifications,
  selectPageNotifications,
  selectSideNotifications,
  selectLatestGlobalNotificationAsList,
  selectNotificationsByDomain,
} from './selectors';

describe('isNotificationVisible', () => {
  describe('when no plugin is active', () => {
    it('should show global notifications', () => {
      expect(isNotificationVisible(null, null)).toBe(true);
    });
    it('should hide plugin notifications', () => {
      expect(isNotificationVisible(null, 'non-active-plugin')).toBe(false);
    });
  });
  describe('when a plugin is active', () => {
    it('should show global notifications', () => {
      expect(isNotificationVisible('active-plugin', null)).toBe(true);
    });
    it('should hide notifications from other plugins', () => {
      expect(isNotificationVisible('active-plugin', 'non-active-plugin')).toBe(
        false
      );
    });
    it('should show notifications from the active plugin', () => {
      expect(isNotificationVisible('active-plugin', 'active-plugin')).toBe(
        true
      );
    });
  });
});

describe('selectGlobalNotifications', () => {
  it('should select global notifications', () => {
    expect(
      selectGlobalNotifications.resultFunc([
        { domain: DOMAINS.GLOBAL },
        { domain: DOMAINS.PAGE },
      ])
    ).toEqual([{ domain: DOMAINS.GLOBAL }]);
  });
});

describe('selectPageNotifications', () => {
  it('should select page notifications', () => {
    expect(
      selectPageNotifications.resultFunc([
        { domain: DOMAINS.GLOBAL },
        { domain: DOMAINS.PAGE },
      ])
    ).toEqual([{ domain: DOMAINS.PAGE }]);
  });
});

describe('selectSideNotifications', () => {
  it('should select side notifications', () => {
    expect(
      selectSideNotifications.resultFunc([
        { domain: DOMAINS.SIDE },
        { domain: DOMAINS.PAGE },
      ])
    ).toEqual([{ domain: DOMAINS.SIDE }]);
  });
});

describe('selectLatestGlobalNotificationAsList', () => {
  it('should select latest global notifications', () => {
    expect(
      selectLatestGlobalNotificationAsList.resultFunc([
        { domain: DOMAINS.GLOBAL },
        { domain: DOMAINS.SIDE },
        { domain: DOMAINS.PAGE },
      ])
    ).toEqual([{ domain: DOMAINS.GLOBAL }]);
  });
});

describe('selectNotificationsByDomain', () => {
  it('should return an object with global side and page notifications', () => {
    const globalNotifications = [
      { domain: DOMAINS.GLOBAL, plugin: 'application-categories' },
    ];
    const pageNotifications = [
      { domain: DOMAINS.PAGE, plugin: 'application-categories' },
    ];
    const sideNotifications = [
      { domain: DOMAINS.SIDE, plugin: 'application-categories' },
    ];
    expect(
      selectNotificationsByDomain.resultFunc(
        globalNotifications,
        pageNotifications,
        sideNotifications,
        'application-categories'
      )
    ).toEqual({
      global: globalNotifications,
      page: pageNotifications,
      side: sideNotifications,
    });
  });
});
