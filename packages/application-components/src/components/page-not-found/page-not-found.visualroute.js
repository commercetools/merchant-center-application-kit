import React from 'react';
import { PageNotFound } from '@local-build/application-components';
import { Suite, Spec } from '../../../../../visual-testing-app/test-utils';

export const routePath = '/page-not-found';

export const component = () => (
  <Suite>
    <Spec label="PageNotFound" size="l" contentAlignment="center">
      <PageNotFound />
    </Spec>
  </Suite>
);
