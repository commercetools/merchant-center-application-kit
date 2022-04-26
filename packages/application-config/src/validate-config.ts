import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import Ajv, { type ErrorObject } from 'ajv';
import schemaJson from '../schema.json';
import type { CustomApplicationData } from './types';

type ErrorAdditionalProperty = ErrorObject<
  'additionalProperty',
  { additionalProperty: string }
>;
type ErrorEnum = ErrorObject<'enum', { allowedValues: string[] }>;

const ajv = new Ajv({ strict: true, useDefaults: true });

const validate =
  ajv.compile<JSONSchemaForCustomApplicationConfigurationFiles>(schemaJson);

const printErrors = (errors?: ErrorObject[] | null) => {
  if (!errors) {
    return 'No errors';
  }

  return errors
    .map((error) => {
      const baseMessage = `${error.instancePath} ${error.message}`;
      switch (error.keyword) {
        case 'additionalProperties':
          return `${baseMessage}: ${
            (error as ErrorAdditionalProperty).params.additionalProperty
          }`;
        case 'enum':
          return `${baseMessage}: ${(
            error as ErrorEnum
          ).params.allowedValues.toString()}`;
        default:
          return baseMessage;
      }
    })
    .join('\n');
};

const validateConfig = (
  config: JSONSchemaForCustomApplicationConfigurationFiles
): void => {
  const valid = validate(config);
  if (!valid) {
    throw new Error(printErrors(validate.errors));
  }
};

export default validateConfig;

export const validateSubmenuLinks = (
  submenuLinks: CustomApplicationData['submenuLinks']
) => {
  const uriPathSet = new Set();
  submenuLinks.forEach(({ uriPath }) => {
    if (uriPathSet.has(uriPath)) {
      throw new Error(
        'Duplicate URI path. Every submenu link must have a unique URI path value'
      );
    }
    uriPathSet.add(uriPath);
  });
};
