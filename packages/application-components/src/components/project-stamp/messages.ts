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
      '{daysLeft, select, 0 {Trial ends today} 1 {Trial ends in 1 day} other {Trial ends in {daysLeft} days}}',
  },
});
