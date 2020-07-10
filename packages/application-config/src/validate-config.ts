import type { AdditionalPropertiesParams, EnumParams } from 'ajv';
import type { ApplicationConfig } from './types';

import Ajv from 'ajv';
import schemaJson from '../schema.json';

const ajv = new Ajv({
  format: 'full',
  jsonPointers: true,
  strictDefaults: true,
  strictKeywords: true,
  strictNumbers: true,
});
const validate = ajv.compile(schemaJson);

const printErrors = (errors: typeof validate.errors) => {
  if (!errors) {
    return 'No errors';
  }

  return errors
    .map((error) => {
      const baseMessage = `${error.dataPath} ${error.message}`;
      switch (error.keyword) {
        case 'additionalProperties':
          return `${baseMessage}: ${
            (error.params as AdditionalPropertiesParams).additionalProperty
          }`;
        case 'enum':
          return `${baseMessage}: ${(error.params as EnumParams).allowedValues.toString()}`;
        default:
          return baseMessage;
      }
    })
    .join('\n');
};

const validateConfig = async (config?: ApplicationConfig): Promise<void> => {
  const valid = validate(config);
  if (!valid) {
    throw new Error(printErrors(validate.errors));
  }
};

export default validateConfig;
