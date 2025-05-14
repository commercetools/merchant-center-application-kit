import {
  fake,
  Generator,
} from '@commercetools/composable-commerce-test-data/core';
import type { TMenuVisibilities } from './types';

const generator = Generator<TMenuVisibilities>({
  fields: {
    hideDashboard: fake(() => true),
    // ...
  },
});

export default generator;
