import { defineMessages } from 'react-intl';

export default defineMessages({
  noProductsFound: {
    id: 'AppKit.ProductPickerInput.noProductsFound',
    description: 'The message to display when no products were found',
    defaultMessage: 'There are no products that match your search',
  },
  placeholder: {
    id: 'AppKit.ProductPickerInput.placeholder',
    description: 'The placeholder of the input',
    defaultMessage: 'Search by product name, key or type an ID',
  },
  onResourceLoadError: {
    id: 'AppKit.ProductPickerInput.onResourceLoadError',
    description: 'Message to show when fetching the initial value failed.',
    defaultMessage:
      'Unable to load resource. Check the connection and try again.',
  },
});
