import { Factory } from 'rosie';
import faker from 'faker';

const ApplicationAppbarMenu = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'BaseMenu')
  .attr('id', () => faker.random.uuid())
  .attr('key', () => faker.lorem.slug(1))
  .attr('uriPath', () => faker.lorem.slug(1))
  .attr('labelAllLocales', () => [
    { __typename: 'LocalizedField', locale: 'en', value: faker.random.word() },
  ])
  .attr('featureToggle', null)
  .attr('permissions', []);

export default ApplicationAppbarMenu;
