import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import LegacyApplicationNavbarMenu from './legacy-application-navbar-menu';

const LegacyCustomApplication = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'ApplicationExtension')
  .attr('id', () => faker.datatype.uuid())
  .attr('navbarMenu', () => LegacyApplicationNavbarMenu.build());

export default LegacyCustomApplication;
