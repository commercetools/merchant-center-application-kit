import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import CustomApplication from './custom-application';

const CustomApplicationInstallation = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'CustomApplicationInstallation')
  .attr('id', () => faker.datatype.uuid())
  .attr('application', () => CustomApplication.build());

export default CustomApplicationInstallation;
