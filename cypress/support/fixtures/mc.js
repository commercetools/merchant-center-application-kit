import { Factory } from 'rosie';
import faker from 'faker';

const Project = new Factory()
  .sequence('sequenceId')
  .attr('key', faker.random.alphaNumeric(4))
  .attr('version', faker.random.number())
  .attr('name', faker.company.companyName())
  .attr('countries', ['de'])
  .attr('currencies', ['EUR', 'USD'])
  .attr('languages', ['en', 'de'])
  .attr('initialized', true)
  .attr('expiry', {
    isActive: false,
  })
  .attr('suspension', {
    isActive: false,
  })
  .attr('allAppliedPermissions', [])
  .attr('allAppliedActionRights', [])
  .attr('allAppliedMenuVisibilities', [])
  .attr('allAppliedDataFences', [])
  .attr('owner', {
    id: faker.random.uuid(),
  });
const User = new Factory()
  .sequence('sequenceId')
  .attr('email', faker.internet.email())
  .attr('gravatarHash', faker.random.alphaNumeric(16))
  .attr('firstName', faker.name.firstName())
  .attr('lastName', faker.name.lastName())
  .attr('language', faker.locale)
  .attr('numberFormat', faker.random.locale())
  .attr('timeZone', 'Europe/Berlin')
  .attr('launchdarklyTrackingId', faker.random.alphaNumeric(16))
  .attr(
    'launchdarklyTrackingGroup',
    faker.helpers.slugify(faker.company.companyName())
  )
  .attr('launchdarklyTrackingTeam', [faker.random.word()])
  .attr('launchdarklyTrackingTenant', 'gcp-eu')
  .attr('defaultProjectKey', faker.random.alphaNumeric(4))
  .attr('projects', {
    total: 2,
    results: [Project.build(), Project.build()],
  });

export const defaultFixtures = {
  User,
  Project,
};

export const createResolvers = (_, resolvers = {}) => ({
  Query: () => ({
    me: () => defaultFixtures.User.build(),
    project: (obj, args) =>
      defaultFixtures.Project.build(args.key ? { key: args.key } : {}),
    ...resolvers.query,
  }),
});
