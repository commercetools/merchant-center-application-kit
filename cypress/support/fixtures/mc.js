import { Factory } from 'rosie';
import faker from 'faker';

const Project = new Factory()
  .sequence('sequenceId')
  .attr('key', () => faker.random.alphaNumeric(4))
  .attr('version', () => faker.random.number())
  .attr('name', () => faker.company.companyName())
  .attr('countries', ['de'])
  .attr('currencies', ['EUR', 'USD'])
  .attr('languages', ['en', 'de'])
  .attr('initialized', true)
  .attr('expiry', { isActive: false })
  .attr('suspension', { isActive: false })
  .attr('allAppliedPermissions', [])
  .attr('allAppliedActionRights', [])
  .attr('allAppliedMenuVisibilities', [])
  .attr('allAppliedDataFences', [])
  .attr('owner', () => ({ id: faker.random.uuid(), typeId: 'organization' }));

const User = new Factory()
  .sequence('sequenceId')
  .attr('email', () => faker.internet.email())
  .attr('gravatarHash', () => faker.random.alphaNumeric(16))
  .attr('firstName', () => faker.name.firstName())
  .attr('lastName', () => faker.name.lastName())
  .attr('language', () => faker.locale)
  .attr('numberFormat', () => faker.random.locale())
  .attr('timeZone', 'Europe/Berlin')
  .attr('launchdarklyTrackingId', () => faker.random.alphaNumeric(16))
  .attr('launchdarklyTrackingGroup', () =>
    faker.helpers.slugify(faker.company.companyName())
  )
  .attr('launchdarklyTrackingTeam', () => [faker.random.word()])
  .attr('launchdarklyTrackingTenant', 'gcp-eu')
  .attr('defaultProjectKey', () => null)
  .attr('projects', () => ({
    total: 0,
    results: [],
  }));

export const defaultFixtures = {
  User,
  Project,
};

export const createResolvers = (resolvers = {}) => {
  const defaultProject =
    resolvers.FetchProject && resolvers.FetchProject.project
      ? resolvers.FetchProject.project
      : Project.build();
  return {
    FetchLoggedInUser: {
      me: defaultFixtures.User.build({
        defaultProjectKey: defaultProject.key,
        projects: {
          total: 2,
          results: [defaultProject, Project.build()],
        },
      }),
    },
    FetchProject: {
      project: defaultProject,
    },
    ...resolvers,
  };
};
