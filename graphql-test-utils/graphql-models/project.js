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

export default Project;
