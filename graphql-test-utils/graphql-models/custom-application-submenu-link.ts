import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

const CustomApplicationSubmenuLink = new Factory()
  .sequence('sequenceId')
  .attr('__typename', 'CustomApplicationSubmenuLink')
  .attr('id', () => faker.string.uuid())
  .attr('uriPath', () => faker.string.alphanumeric(4))
  .attr('permissions', () => [])
  .attr('defaultLabel', () => 'Something new')
  .attr('labelAllLocales', () => []);

export default CustomApplicationSubmenuLink;
