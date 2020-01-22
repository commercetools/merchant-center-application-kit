import { Factory } from 'rosie';
import faker from 'faker';
import ApplicationSubmenu from './application-navbar-submenu';

const ApplicationNavbarMenu = new Factory()
  .sequence('sequenceId')
  .attr('shouldRenderDivider', false)
  .attr('key', () => faker.lorem.slug(1))
  .attr('uriPath', () => faker.lorem.slug(1))
  .attr('icon', 'UserFilledIcon')
  .attr('labelAllLocales', () => [{ locale: 'en', value: faker.random.word() }])
  .attr('featureToggle', null)
  .attr('menuVisibility', null)
  .attr('permissions', [])
  .attr('dataFences', null)
  .attr('actionRights', null)
  .attr('submenu', () => ApplicationSubmenu.buildList(1));

export default ApplicationNavbarMenu;
