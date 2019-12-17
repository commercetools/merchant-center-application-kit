import React from 'react';
import { PageNotFound } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/page-not-found';

export const Component = () => (
  <Suite>
    <Spec label="PageNotFound" size="l" contentAlignment="center">
      <PageNotFound />
    </Spec>
  </Suite>
);
