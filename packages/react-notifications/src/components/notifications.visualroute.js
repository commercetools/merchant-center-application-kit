import React from 'react';
import { DOMAINS } from '@commercetools-frontend/constants';
import { Notification } from '@local-build/react-notifications';
import { Suite, Spec } from '../../../../visual-testing-app/test-utils';

export const routePath = '/notifications';

export const component = () => (
  <Suite>
    <Spec label="Notification - Side (success)">
      <Notification type="success" domain={DOMAINS.SIDE}>
        {'I am your father.'}
      </Notification>
    </Spec>
    <Spec label="Notification - Side (info)">
      <Notification type="info" domain={DOMAINS.SIDE}>
        {'Do or do not, there is no try.'}
      </Notification>
    </Spec>
    <Spec label="Notification - Side (warning)">
      <Notification type="warning" domain={DOMAINS.SIDE}>
        {'These are not the droids you are looking for!'}
      </Notification>
    </Spec>
    <Spec label="Notification - Side (error)">
      <Notification type="error" domain={DOMAINS.SIDE}>
        {`It's a trap!`}
      </Notification>
    </Spec>
    <Spec label="Notification - Page (success)">
      <Notification type="success" domain={DOMAINS.PAGE}>
        {'I am your father.'}
      </Notification>
    </Spec>
    <Spec label="Notification - Page (info)">
      <Notification type="info" domain={DOMAINS.PAGE}>
        {'Do or do not, there is no try.'}
      </Notification>
    </Spec>
    <Spec label="Notification - Page (warning)">
      <Notification type="warning" domain={DOMAINS.PAGE}>
        {'These are not the droids you are looking for!'}
      </Notification>
    </Spec>
    <Spec label="Notification - Page (error)">
      <Notification type="error" domain={DOMAINS.PAGE}>
        {`It's a trap!`}
      </Notification>
    </Spec>
    <Spec label="Notification - Global (info)">
      <Notification type="info" domain={DOMAINS.GLOBAL}>
        {'Do or do not, there is no try.'}
      </Notification>
    </Spec>
    <Spec label="Notification - Global (warning)">
      <Notification type="warning" domain={DOMAINS.GLOBAL}>
        {'These are not the droids you are looking for!'}
      </Notification>
    </Spec>
    <Spec label="Notification - Global (error)">
      <Notification type="error" domain={DOMAINS.GLOBAL}>
        {`It's a trap!`}
      </Notification>
    </Spec>
  </Suite>
);
