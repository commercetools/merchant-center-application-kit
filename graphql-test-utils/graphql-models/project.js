import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

const Project = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'Project')
  .attr('key', () => faker.random.alphaNumeric(4))
  .attr('version', () => faker.datatype.number())
  .attr('name', () => faker.company.name())
  .attr('countries', ['de'])
  .attr('currencies', ['EUR', 'USD'])
  .attr('languages', ['en', 'de'])
  .attr('initialized', true)
  .attr('expiry', {
    __typename: 'ProjectExpiry',
    isActive: false,
    daysLeft: null,
  })
  .attr('suspension', {
    __typename: 'ProjectSuspension',
    isActive: false,
    reason: null,
  })
  .attr('allAppliedPermissions', [])
  .attr('allAppliedActionRights', [])
  .attr('allAppliedDataFences', [])
  .attr('allPermissionsForAllApplications', () => ({
    allAppliedPermissions: [],
    allAppliedActionRights: [],
    allAppliedDataFences: [],
    allAppliedMenuVisibilities: [],
  }))
  .attr('owner', () => ({
    __typename: 'Organization',
    id: faker.datatype.uuid(),
    name: faker.company.name(),
  }));

export default Project;
