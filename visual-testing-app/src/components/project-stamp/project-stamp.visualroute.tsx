import { ProjectStamp } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/project-stamp';

export const Component = () => (
  <Suite>
    <Spec label="Production project stamp">
      <ProjectStamp.IsProduction />
    </Spec>
    <Spec label="Suspended project stamp">
      <ProjectStamp.IsSuspended />
    </Spec>
    <Spec label="Expired project stamp">
      <ProjectStamp.IsExpired />
    </Spec>
    <Spec label="Will expire project stamp">
      <ProjectStamp.WillExpire daysLeft={3} />
    </Spec>
  </Suite>
);
