import { Builder } from '@commercetools/composable-commerce-test-data/core';
import generator from './generator';
import transformers from './transformers';
import type { TCreateOrganizationBuilder, TOrganization } from './types';

const Organization: TCreateOrganizationBuilder = () =>
  Builder<TOrganization>({
    generator,
    transformers,
  });

export default Organization;
