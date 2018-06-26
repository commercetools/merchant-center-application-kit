import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'Channels.ListView.title',
    description: 'The page title of channels list',
    defaultMessage: 'Channels',
  },
  columnChannelKey: {
    id: 'Channels.ListView.column.channelKey',
    description: 'Title of the table column (channel key)',
    defaultMessage: 'Key',
  },
  columnChannelName: {
    id: 'Channels.ListView.column.channelName',
    description: 'Title of the table column (channel name)',
    defaultMessage: 'Name',
  },
  noResultsText: {
    id: 'Channels.ListView.noResults',
    description: 'Text for no results',
    defaultMessage: 'There are no results matching your search criteria.',
  },
});
