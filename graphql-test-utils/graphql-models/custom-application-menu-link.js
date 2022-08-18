import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

const CustomApplicationMenuLink = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'CustomApplicationMenuLink')
  .attr('id', () => faker.datatype.uuid())
  .attr('permissions', () => [])
  .attr('defaultLabel', () => 'My application')
  .attr('labelAllLocales', () => []);

export default CustomApplicationMenuLink;
