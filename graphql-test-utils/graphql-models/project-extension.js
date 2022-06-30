import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';
import CustomApplication from './custom-application';

const ProjectExtension = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'ProjectExtension')
  .attr('id', () => faker.datatype.uuid())
  .attr('applications', () => CustomApplication.buildList(1))
  .attr('installedApplications', []);

export default ProjectExtension;
