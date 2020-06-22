import React from 'react';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/page-unauthorized';

export const Component = () => (
  <Suite>
    <Spec label="PageUnauthorized" size="l" contentAlignment="center">
      <PageUnauthorized />
    </Spec>
  </Suite>
);
