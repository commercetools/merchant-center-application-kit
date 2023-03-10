import { Builder } from '@commercetools-test-data/core';
import * as OrganizationMock from '../organization';
import * as ExpiryMock from './fields/expiry';
import * as SuspensionMock from './fields/suspension';
import generator from './generator';
import transformers from './transformers';
import type { TCreateProjectBuilder, TProject } from './types';

const Project: TCreateProjectBuilder = () =>
  Builder<TProject>({
    generator,
    transformers,
  })
    .owner(OrganizationMock.random())
    .suspension(SuspensionMock.random())
    .expiry(ExpiryMock.random());

export default Project;
