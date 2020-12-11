import type { TRenderAppOptions } from '@commercetools-frontend/application-shell/test-utils';

// import { graphql } from 'msw';
// import { setupServer } from 'msw/node';
import React from 'react';
import {
  renderApp,
  fireEvent,
  screen,
} from '@commercetools-frontend/application-shell/test-utils';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import ProductPickerInput from './product-picker-input';
import FetchProductByPrefix from './fetch-product-by-prefix.ctp.graphql';
import PrefetchProduct from './prefetch-selected-product.ctp.graphql';

const productId = '6f69c022-b894-4deb-b19f-6335547cb5d7';
const inputName = 'product-picker-input';

const createTestProps = (custom = {}) => ({
  name: inputName,
  value: productId,
  hasError: false,
  isReadOnly: false,
  isClearable: false,
  isDisabled: false,
  onChange: jest.fn().mockName('onChange'),
  onInitialLoadError: jest.fn().mockName('onInitialLoadError'),
  onLoadError: jest.fn().mockName('onLoadError'),
  ...custom,
});

const createTestProduct = (custom = {}) => ({
  id: productId,
  key: 'milk-product',
  masterData: {
    current: {
      nameAllLocales: [
        {
          locale: 'en',
          value: 'Milk',
        },
      ],
    },
  },
  ...custom,
});

const createPrefetchedProductQueryMock = (custom = {}) => ({
  request: {
    query: PrefetchProduct,
    context: { target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM },
    variables: { id: productId },
  },
  result: {
    data: {
      product: createTestProduct(),
    },
  },
  ...custom,
});

const createPrefixedSearchProductQueryMock = (custom = {}) => ({
  request: {
    query: FetchProductByPrefix,
    variables: {
      where:
        'masterData(current(name(en >= "H" and en < "I"))) or key >= "H" and key < "I"',
    },
  },
  result: {
    data: {
      products: {
        results: [createTestProduct()],
      },
    },
  },
  ...custom,
});

const render = (
  ui: React.ReactElement,
  renderOptions: Partial<TRenderAppOptions<{}>>
) => {
  return renderApp(
    <>
      <label htmlFor={inputName}>Product picker</label>
      {ui}
    </>,
    {
      dataLocale: 'en',
      ...renderOptions,
    }
  );
};

describe('initial load', () => {
  describe('when `value` is valid', () => {
    it('should prefetch product', async () => {
      const props = createTestProps();
      render(<ProductPickerInput {...props} />, {
        mocks: [createPrefetchedProductQueryMock()],
      });
      await screen.findByText(/milk/i);
    });
  });
  describe('when `value` is not valid', () => {
    it('should not prefetch product', async () => {
      const props = createTestProps({
        value: 'NOT_VALID_UUID',
        name: 'NOT_VALID_UUID',
      });
      render(<ProductPickerInput {...props} />, {
        mocks: [createPrefetchedProductQueryMock()],
      });
      await screen.findByText(/Search by name or key/i);
      expect(screen.queryByText(/milk/i)).not.toBeInTheDocument();
    });
  });
  describe('when there is an error', () => {
    it('should render error message', async () => {
      const props = createTestProps();
      render(<ProductPickerInput {...props} />, {
        mocks: [
          createPrefetchedProductQueryMock({
            result: {
              data: null,
              errors: [
                {
                  code: 'InvalidRequest',
                  message: 'invalid request',
                },
              ],
            },
          }),
        ],
      });
      await screen.findByText(/unable to load products/i);
      expect(props.onInitialLoadError).toHaveBeenCalled();
    });
  });
});

describe('loading products', () => {
  describe('when product(s) is found', () => {
    it('should display found product as option', async () => {
      const props = createTestProps({ value: null });
      render(<ProductPickerInput {...props} />, {
        mocks: [createPrefixedSearchProductQueryMock()],
      });

      const input = await screen.findByLabelText('Product picker');
      expect(input).toBeInTheDocument();
      fireEvent.change(input, {
        target: { value: 'H' },
      });

      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await screen.findByText(/key: milk-product/i);
    });
  });
  describe('when product(s) is not  found', () => {
    it('should display message that matching products not found', async () => {
      const props = createTestProps({ value: null });
      render(<ProductPickerInput {...props} />, {
        mocks: [
          createPrefixedSearchProductQueryMock({
            result: {
              data: {
                products: {
                  results: [],
                },
              },
            },
          }),
        ],
      });
      const input = await screen.findByLabelText('Product picker');
      expect(input).toBeInTheDocument();
      fireEvent.change(input, {
        target: { value: 'H' },
      });

      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await screen.findByText(/no case sensitive matches found/i);
    });
  });
  describe('when there is an error', () => {
    it('should display error message', async () => {
      const props = createTestProps({ value: null });
      render(<ProductPickerInput {...props} />, {
        mocks: [
          createPrefixedSearchProductQueryMock({
            result: {
              data: null,
              errors: [
                {
                  code: 'InvalidRequest',
                  message: 'invalid request',
                },
              ],
            },
          }),
        ],
      });
      const input = await screen.findByLabelText('Product picker');
      expect(input).toBeInTheDocument();
      fireEvent.change(input, {
        target: { value: 'H' },
      });
      await screen.findByText(/unable to load products/i);
      expect(props.onLoadError).toHaveBeenCalled();
    });
  });
});
