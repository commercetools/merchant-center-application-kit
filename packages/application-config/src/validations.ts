import Ajv, { type ErrorObject } from 'ajv';
import schemaJson from '../schema.json';
import {
  ENTRY_POINT_URI_PATH_REGEX,
  PERMISSION_GROUP_NAME_REGEX,
} from './constants';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';

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
  if (!config.entryPointUriPath.match(ENTRY_POINT_URI_PATH_REGEX)) {
    throw new Error(
      'Invalid "entryPointUriPath". The value may be between 2 and 64 characters and only contain alphanumeric lowercase characters, non-consecutive underscores and hyphens. Leading and trailing underscores and hyphens are also not allowed.'
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

export const validateAdditionalOAuthScopes = (
  config: JSONSchemaForCustomApplicationConfigurationFiles
) => {
  const additionalPermissionNames = new Set();
  config.additionalOAuthScopes?.forEach(({ name, view, manage }) => {
    if (
      ((Array.isArray(view) && view.length === 0) || !view) &&
      ((Array.isArray(manage) && manage.length === 0) || !manage)
    ) {
      throw new Error(
        `At least one OAuth Scope for permission group name "${name}" is required`
      );
    } else if (additionalPermissionNames.has(name)) {
      throw new Error(
        `Duplicate additional permission group name "${name}". Every additional permission must have a unique name`
      );
    }
    if (!name.match(PERMISSION_GROUP_NAME_REGEX)) {
      throw new Error(
        `Additional permission group name "${name}" is invalid. The value may be between 2 and 64 characters and only contain alphabetic lowercase characters and non-consecutive hyphens. Leading and trailing hyphens are also not allowed`
      );
    }
    additionalPermissionNames.add(name);
  });
};
