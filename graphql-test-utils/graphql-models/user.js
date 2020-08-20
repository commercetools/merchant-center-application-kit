import { Factory } from 'rosie';
import faker from 'faker';

const User = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'User')
  .attr('id', () => faker.random.uuid())
  .attr('email', () => faker.internet.email())
  .attr('gravatarHash', () => faker.random.alphaNumeric(16))
  .attr('firstName', () => faker.name.firstName())
  .attr('lastName', () => faker.name.lastName())
  .attr('language', 'en')
  .attr('numberFormat', () => faker.random.locale())
  .attr('timeZone', 'Europe/Berlin')
  .attr('launchdarklyTrackingId', () => faker.random.alphaNumeric(16))
  .attr('launchdarklyTrackingGroup', () =>
    faker.helpers.slugify(faker.company.companyName())
  )
  .attr('launchdarklyTrackingSubgroup', () => 'dev')
  .attr('launchdarklyTrackingTeam', () => [faker.random.word()])
  .attr('launchdarklyTrackingTenant', 'gcp-eu')
  .attr('defaultProjectKey', () => null)
  .attr('projects', () => ({
    __typename: 'ProjectQueryResult',
    total: 0,
    results: [],
  }));

export default User;
