import { defineMessages } from 'react-intl';

export default defineMessages({
  ProjectProduction: {
    id: 'ProjectStamp.production',
    defaultMessage: 'Production',
  },
  ProjectSuspended: {
    id: 'ProjectStamp.suspended',
    defaultMessage: 'Suspended',
  },
  ProjectExpired: {
    id: 'ProjectStamp.expired',
    defaultMessage: 'Trial expired',
  },
  ProjectWillExpire: {
    id: 'ProjectStamp.willExpire',
    defaultMessage:
      'Trial ends in {daysLeft} {daysLeft, plural, one {day} other {days}}',
  },
});
