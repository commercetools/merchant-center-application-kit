import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const Channel = () =>
  Builder({
    generator,
    transformers,
  });

export default Channel;
