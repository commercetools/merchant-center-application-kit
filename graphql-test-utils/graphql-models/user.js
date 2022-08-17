import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

const User = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'User')
  .attr('id', () => faker.datatype.uuid())
  .attr('email', () => faker.internet.email())
  .attr('gravatarHash', () => faker.random.alphaNumeric(16))
  .attr('firstName', () => faker.name.firstName())
  .attr('lastName', () => faker.name.lastName())
  .attr('language', 'en')
  .attr('numberFormat', () => faker.random.locale())
  .attr('timeZone', 'Europe/Berlin')
  .attr('launchdarklyTrackingId', () => faker.random.alphaNumeric(16))
  .attr('launchdarklyTrackingGroup', () =>
    faker.helpers.slugify(faker.company.name())
  )
  .attr('launchdarklyTrackingSubgroup', () => 'dev')
  .attr('launchdarklyTrackingTeam', () => [faker.random.word()])
  .attr('launchdarklyTrackingTenant', 'gcp-eu')
  .attr('defaultProjectKey', () => null)
  .attr('businessRole', () => faker.name.jobDescriptor())
  .attr('projects', () => ({
    __typename: 'ProjectQueryResult',
    total: 0,
    results: [],
  }));

export default User;
