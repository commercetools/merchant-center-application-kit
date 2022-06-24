import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';
import ApplicationNavbarMenu from './application-navbar-menu';

const CustomApplication = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'ApplicationExtension')
  .attr('id', () => faker.datatype.uuid())
  .attr('navbarMenu', () => ApplicationNavbarMenu.build());

export default CustomApplication;
