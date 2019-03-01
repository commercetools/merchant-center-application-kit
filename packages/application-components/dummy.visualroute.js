import React from 'react';
import { Spec, Suite } from './test-utils/visual';

export const routePath = '/dummy';

export const component = () => (
  <Suite>
    <Spec label="Dummy">
      <div>{'Dummy'}</div>
    </Spec>
  </Suite>
);
