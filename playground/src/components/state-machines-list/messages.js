import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'StateMachines.ListView.title',
    description: 'The page title of state machines list',
    defaultMessage: 'State Machines',
  },
  columnStateMachineKey: {
    id: 'StateMachines.ListView.column.stateMachineKey',
    description: 'Title of the table column (state machine key)',
    defaultMessage: 'Key',
  },
  columnStateMachineName: {
    id: 'StateMachines.ListView.column.stateMachineName',
    description: 'Title of the table column (state machine name)',
    defaultMessage: 'Name',
  },
  noResultsText: {
    id: 'StateMachines.ListView.noResults',
    description: 'Text for no results',
    defaultMessage: 'There are no results matching your search criteria.',
  },
});
