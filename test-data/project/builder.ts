import type { TCreateProjectBuilder, TProject } from './types';

import { Builder } from '@commercetools-test-data/core';
import * as OrganizationMock from '../organization';
import * as SuspensionMock from './fields/suspension';
import * as ExpiryMock from './fields/expiry';
import generator from './generator';
import transformers from './transformers';

const User: TCreateProjectBuilder = ({ defaults } = {}) =>
  Builder<TProject>({
    generator,
    transformers,
    defaults,
  })
    .owner(OrganizationMock.random())
    .suspension(SuspensionMock.random())
    .expiry(ExpiryMock.random());

export default User;
