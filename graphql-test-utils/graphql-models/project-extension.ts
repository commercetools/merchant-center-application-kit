import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

const ProjectExtension = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'ProjectExtension')
  .attr('id', () => faker.datatype.uuid())
  .attr('installedApplications', []);

export default ProjectExtension;
