import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

const ProjectExtension = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'ProjectExtension')
  .attr('id', () => faker.string.uuid())
  .attr('installedApplications', []);

export default ProjectExtension;
