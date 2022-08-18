import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

const ApplicationNavbarSubmenu = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'NavbarSubmenu')
  .attr('id', () => faker.datatype.uuid())
  .attr('key', () => faker.lorem.slug(1))
  .attr('uriPath', () => `${faker.lorem.slug(1)}/${faker.lorem.slug(1)}`)
  .attr('labelAllLocales', () => [
    { __typename: 'LocalizedField', locale: 'en', value: faker.random.word() },
  ])
  .attr('defaultLabel', null)
  .attr('featureToggle', null)
  .attr('menuVisibility', null)
  .attr('permissions', [])
  .attr('dataFences', null)
  .attr('actionRights', null);

export default ApplicationNavbarSubmenu;
