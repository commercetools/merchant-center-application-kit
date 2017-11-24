import { defineMessages } from 'react-intl';

export default defineMessages({
  projects: {
    id: 'ProjectSwitcher.projects',
    description: 'The label for project dropdown switcher',
    defaultMessage: 'Projects',
  },
  searchPlaceholder: {
    id: 'ProjectSwitcher.searchPlaceholder',
    description: 'Projects filter search input placeholder',
    defaultMessage: 'Search for a project',
  },
  noResults: {
    id: 'ProjectSwitcher.noResults',
    description: 'Projects filter no results text',
    defaultMessage: 'Sorry, but there are no projects that match your search.',
  },
  suspended: {
    id: 'ProjectSwitcher.suspended',
    description: 'Label for a suspended project',
    defaultMessage: 'Suspended',
  },
  expired: {
    id: 'ProjectSwitcher.expired',
    description: 'Label for a suspended project',
    defaultMessage: 'Expired',
  },
});
