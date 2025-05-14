import {
  fake,
  Generator,
} from '@commercetools/composable-commerce-test-data/core';
import type { TProjectExpiry } from './types';

const generator = Generator<TProjectExpiry>({
  fields: {
    isActive: fake(() => false),
    daysLeft: null,
  },
});

export default generator;
