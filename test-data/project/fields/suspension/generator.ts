import {
  fake,
  Generator,
} from '@commercetools/composable-commerce-test-data/core';
import type { TProjectSuspension } from './types';

const generator = Generator<TProjectSuspension>({
  fields: {
    isActive: fake(() => false),
    reason: null,
  },
});

export default generator;
