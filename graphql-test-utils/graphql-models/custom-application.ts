import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import CustomApplicationMenuLink from './custom-application-menu-link';
import CustomApplicationSubmenuLink from './custom-application-submenu-link';

const CustomApplication = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'CustomApplication')
  .attr('id', () => faker.string.uuid())
  .attr('entryPointUriPath', () => faker.string.alphanumeric(6))
  .attr('icon', () => '<svg><path fill="#000000" /></svg>')
  .attr('mainMenuLink', () => CustomApplicationMenuLink.build())
  .attr('submenuLinks', () => CustomApplicationSubmenuLink.buildList(1));

export default CustomApplication;
