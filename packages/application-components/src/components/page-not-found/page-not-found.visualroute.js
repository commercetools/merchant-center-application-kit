import React from 'react';
import { PageNotFound } from 'application-components';
import { Spec, Suite } from '../../../test-utils/visual';

export const routePath = '/page-not-found';

export const component = () => (
  <Suite>
    <Spec label="PageNotFound" size="l" contentAlignment="center">
      <PageNotFound />
    </Spec>
  </Suite>
);
