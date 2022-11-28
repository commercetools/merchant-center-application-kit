import { Factory } from 'rosie';
import { faker } from '@faker-js/faker';

const CustomApplicationSubmenuLink = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'CustomApplicationSubmenuLink')
  .attr('id', () => faker.datatype.uuid())
  .attr('uriPath', () => faker.random.alphaNumeric(4))
  .attr('permissions', () => [])
  .attr('defaultLabel', () => 'Something new')
  .attr('labelAllLocales', () => []);

export default CustomApplicationSubmenuLink;
