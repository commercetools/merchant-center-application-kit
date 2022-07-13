import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import DataTable, { type TColumn } from '@commercetools-uikit/data-table';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import type { TChannel } from '../../../types/generated/ctp';

const columns: TColumn[] = [
  { key: 'name', label: 'Channel name' },
  { key: 'key', label: 'Channel key', isSortable: true },
  { key: 'roles', label: 'Roles' },
];
const itemRenderer = (item: TChannel, column: TColumn<TChannel>) => {
  switch (column.key) {
    case 'roles':
      return item.roles.join(', ');
    case 'name':
      const localizedName = item.nameAllLocales.find(
        (field) => field.locale === 'en'
      );
      return localizedName ?? NO_VALUE_FALLBACK;
    default:
      return item[column.key];
  }
};

const Channels = () => {
  // ... channels fetching
  return (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2">Title</Text.Headline>
        <Text.Body>Description</Text.Body>
      </Spacings.Stack>
      <Spacings.Stack scale="xs">
        <DataTable
          columns={columns}
          rows={channels.results}
          itemRenderer={itemRenderer}
        />
        <div>{/* Pagination */}</div>
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
