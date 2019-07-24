import {
  NOTIFICATION_DOMAINS,
  NOTIFICATION_KINDS_SIDE,
  NOTIFICATION_KINDS_GLOBAL,
  NOTIFICATION_KINDS_PAGE,
} from '@commercetools-frontend/constants';
import {
  selectGlobalNotifications,
  selectPageNotifications,
  selectSideNotifications,
} from './selectors';

const testNotifications = [
  {
    domain: NOTIFICATION_DOMAINS.GLOBAL,
    kind: NOTIFICATION_KINDS_GLOBAL.info,
    id: 1,
  },
  {
    domain: NOTIFICATION_DOMAINS.GLOBAL,
    kind: NOTIFICATION_KINDS_GLOBAL.warning,
    id: 2,
  },
  {
    domain: NOTIFICATION_DOMAINS.PAGE,
    kind: NOTIFICATION_KINDS_PAGE.error,
    id: 3,
  },
  {
    domain: NOTIFICATION_DOMAINS.SIDE,
    kind: NOTIFICATION_KINDS_SIDE.success,
    id: 4,
  },
];

describe('selectGlobalNotifications', () => {
  it('should select global notifications', () => {
    expect(selectGlobalNotifications.resultFunc(testNotifications)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ domain: NOTIFICATION_DOMAINS.GLOBAL, id: 1 }),
      ])
    );
  });
});

describe('selectPageNotifications', () => {
  it('should select page notifications', () => {
    expect(selectPageNotifications.resultFunc(testNotifications)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ domain: NOTIFICATION_DOMAINS.PAGE }),
      ])
    );
  });
});

describe('selectSideNotifications', () => {
  it('should select side notifications', () => {
    expect(selectSideNotifications.resultFunc(testNotifications)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ domain: NOTIFICATION_DOMAINS.SIDE }),
      ])
    );
  });
});
