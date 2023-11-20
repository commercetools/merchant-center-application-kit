import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import ApplicationNavbarMenu from './application-navbar-menu';

const ApplicationNavbarMenuGroup = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'NavbarMenuGroup')
  .attr('id', () => faker.datatype.uuid())
  .attr('key', () => '2')
  .attr('items', () => ApplicationNavbarMenu.buildList(1));

export default ApplicationNavbarMenuGroup;
