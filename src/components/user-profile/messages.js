import { defineMessages } from 'react-intl';

export default defineMessages({
  subtitle: {
    id: 'UserProfile.subtitle',
    description:
      'Text to describe how many organizations and projects the user have',
    defaultMessage:
      'You are in {organizationsCount, plural, one {{organizationsCount} organization} other {{organizationsCount} organizations}} and working on {projectsCount, plural, one {{projectsCount} project} other {{projectsCount} projects}}',
  },
  userUpdated: {
    id: 'UserProfile.userUpdated',
    description: 'Notification message for successful update',
    defaultMessage: 'Your profile has been successfully updated',
  },
});
