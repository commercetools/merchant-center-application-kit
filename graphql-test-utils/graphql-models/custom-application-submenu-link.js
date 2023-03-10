import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

const CustomApplicationSubmenuLink = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'CustomApplicationSubmenuLink')
  .attr('id', () => faker.datatype.uuid())
  .attr('uriPath', () => faker.random.alphaNumeric(4))
  .attr('permissions', () => [])
  .attr('defaultLabel', () => 'Something new')
  .attr('labelAllLocales', () => []);

export default CustomApplicationSubmenuLink;
