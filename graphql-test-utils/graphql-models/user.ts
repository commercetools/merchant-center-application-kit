import { faker, en } from '@faker-js/faker';
import { Factory } from 'rosie';

const User = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'User')
  .attr('id', () => faker.string.uuid())
  .attr('email', () => faker.internet.email())
  .attr('createdAt', () => faker.date.past())
  .attr('gravatarHash', () => faker.string.alphanumeric(16))
  .attr('firstName', () => faker.person.firstName())
  .attr('lastName', () => faker.person.lastName())
  .attr('language', 'en')
  .attr('numberFormat', () => en)
  .attr('timeZone', 'Europe/Berlin')
  .attr('launchdarklyTrackingId', () => faker.string.alphanumeric(16))
  .attr('launchdarklyTrackingGroup', () =>
    faker.helpers.slugify(faker.company.name())
  )
  .attr('launchdarklyTrackingSubgroup', () => 'dev')
  .attr('launchdarklyTrackingTeam', () => [faker.word.sample()])
  .attr('launchdarklyTrackingCloudEnvironment', 'gcp-eu')
  .attr('defaultProjectKey', () => null)
  .attr('businessRole', () => faker.person.jobDescriptor())
  .attr('idTokenUserInfo', () => null)
  .attr('projects', () => ({
    __typename: 'ProjectQueryResult',
    total: 0,
    results: [],
  }));

export default User;
