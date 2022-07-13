import Ajv, { type ErrorObject } from 'ajv';
import schemaJson from '../schema.json';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';

type ErrorAdditionalProperty = ErrorObject<
  'additionalProperty',
  { additionalProperty: string }
>;
type ErrorEnum = ErrorObject<'enum', { allowedValues: string[] }>;

const entryPointUriPathRegex = /^[^-_#]([0-9a-z]|[-_](?![-_])){0,62}[^-_#]$/g;

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

export const validateConfig = (
  config: JSONSchemaForCustomApplicationConfigurationFiles
): void => {
  const valid = validate(config);
  if (!valid) {
    throw new Error(printErrors(validate.errors));
  }
};

export const validateEntryPointUriPath = (
  config: JSONSchemaForCustomApplicationConfigurationFiles
) => {
  if (!config.entryPointUriPath.match(entryPointUriPathRegex)) {
    throw new Error(
      'Invalid "entryPointUriPath". The value may be between 2 and 64 characters and only contain alphanumeric lowercase characters, non-consecutive underscores and hyphens. Leading and trailing underscore and hyphens are also not allowed.'
    );
  }
};

export const validateSubmenuLinks = (
  config: JSONSchemaForCustomApplicationConfigurationFiles
) => {
  const uriPathSet = new Set();
  config.submenuLinks.forEach(({ uriPath }) => {
    if (uriPathSet.has(uriPath)) {
      throw new Error(
        'Duplicate URI path. Every submenu link must have a unique URI path value'
      );
    }
    uriPathSet.add(uriPath);
  });
};
