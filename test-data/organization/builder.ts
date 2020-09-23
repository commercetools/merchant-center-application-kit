import type { TCreateOrganizationBuilder, TOrganization } from './types';

import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const Organization: TCreateOrganizationBuilder = ({ defaults } = {}) =>
  Builder<TOrganization>({
    generator,
    transformers,
    defaults,
  });

export default Organization;
