import { defineMessages } from 'react-intl';

export default defineMessages({
  noProductsFound: {
    id: 'Components.ProductPickerInput.noProductsFound',
    description: 'The message to display when no products were found',
    defaultMessage: 'No case sensitive matches found',
  },
  placeholder: {
    id: 'Components.ProductPickerInput.placeholder',
    description: 'The placeholder of the input',
    defaultMessage: 'Search by name or key (case sensitive)',
  },
  onResourceLoadError: {
    id: 'Components.ProductPickerInput.onResourceLoadError',
    description: 'Message to show when fetching the initial value failed.',
    defaultMessage:
      'Unable to load products. Check the connection and try again.',
  },
});
