import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

const ApplicationAppbarMenu = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'BaseMenu')
  .attr('id', () => faker.string.uuid())
  .attr('key', () => faker.lorem.slug(1))
  .attr('uriPath', () => faker.lorem.slug(1))
  .attr('labelAllLocales', () => [
    { __typename: 'LocalizedField', locale: 'en', value: faker.word.sample() },
  ])
  .attr('featureToggle', null)
  .attr('permissions', []);

export default ApplicationAppbarMenu;
