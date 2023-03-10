import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import LegacyCustomApplication from './legacy-custom-application';

const ProjectExtension = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'ProjectExtension')
  .attr('id', () => faker.datatype.uuid())
  .attr('applications', () => LegacyCustomApplication.buildList(1))
  .attr('installedApplications', []);

export default ProjectExtension;
