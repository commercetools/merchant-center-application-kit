import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import ApplicationSubmenu from './application-navbar-submenu';

const ApplicationNavbarMenu = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'NavbarMenu')
  .attr('id', () => faker.datatype.uuid())
  .attr('key', () => faker.lorem.slug(1))
  .attr('uriPath', () => faker.lorem.slug(1))
  .attr('icon', 'UserFilledIcon')
  .attr('labelAllLocales', () => [
    { __typename: 'LocalizedField', locale: 'en', value: faker.random.word() },
  ])
  .attr('defaultLabel', null)
  .attr('featureToggle', null)
  .attr('menuVisibility', null)
  .attr('permissions', [])
  .attr('dataFences', null)
  .attr('actionRights', null)
  .attr('submenu', () => ApplicationSubmenu.buildList(1));

export default ApplicationNavbarMenu;
