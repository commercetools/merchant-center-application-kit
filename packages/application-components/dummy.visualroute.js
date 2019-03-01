import React from 'react';
import { Spec, Suite } from './test-utils/visual';

export const routePath = '/dummy';

export const component = () => (
  <Suite>
    <Spec label="Dummy">
      <div>
        {
          'This is a dummy test, to have at least one test running on Percy in case there are no changes to the UI components.'
        }
      </div>
    </Spec>
  </Suite>
);
