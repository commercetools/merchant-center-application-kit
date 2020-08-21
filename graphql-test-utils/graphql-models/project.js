import { Factory } from 'rosie';
import faker from 'faker';

const Project = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'Project')
  .attr('key', () => faker.random.alphaNumeric(4))
  .attr('version', () => faker.random.number())
  .attr('name', () => faker.company.companyName())
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
  .attr('allAppliedMenuVisibilities', [])
  .attr('allAppliedDataFences', [])
  .attr('owner', () => ({
    __typename: 'Organization',
    id: faker.random.uuid(),
    name: faker.company.companyName(),
  }));

export default Project;
