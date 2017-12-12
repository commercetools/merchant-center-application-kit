import { DOMAINS } from '@commercetools-local/constants';
import {
  selectGlobalNotifications,
  selectPageNotifications,
  selectSideNotifications,
  selectLatestGlobalNotificationAsList,
} from './reducer';

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
