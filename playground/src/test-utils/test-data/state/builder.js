import { Builder } from '@commercetools-test-data/core';
import generator from './generator';
import transformers from './transformers';

const State = () =>
  Builder({
    generator,
    transformers,
  });

export default State;
