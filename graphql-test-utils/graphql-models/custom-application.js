import { Factory } from 'rosie';
import faker from 'faker';
import ApplicationNavbarMenu from './application-navbar-menu';

const CustomApplication = new Factory()
  .sequence('sequenceId')
  .attr('id', () => faker.random.uuid())
  .attr('navbarMenu', () => ApplicationNavbarMenu.build());

export default CustomApplication;
