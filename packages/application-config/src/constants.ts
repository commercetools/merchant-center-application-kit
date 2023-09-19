/**
 * The entryPointUriPath may be between 2 and 64 characters and only contain alphabetic lowercase characters,
 * non-consecutive underscores and hyphens. Leading and trailing underscore and hyphens are also not allowed.
 */
export const ENTRY_POINT_URI_PATH_REGEX =
  /^[^-_#]([0-9a-z]|[-_](?![-_])){0,62}[^-_#]$/g;

/**
 * The permission group name may be between 2 and 64 characters and only contain alphanumeric lowercase characters and non-consecutive hyphens. Leading and trailing hyphens are also not allowed.
 */
export const PERMISSION_GROUP_NAME_REGEX =
  /^[^-#]([a-z]|[-](?![-])){0,62}[^-#]$/g;

export const CLOUD_IDENTIFIERS = {
  GCP_AU: 'gcp-au',
  GCP_EU: 'gcp-eu',
  GCP_US: 'gcp-us',
  AWS_FRA: 'aws-fra',
  AWS_OHIO: 'aws-ohio',
  AWS_CN: 'aws-cn',
} as const;

export const MC_API_URLS = {
  GCP_AU: 'https://mc-api.australia-southeast1.gcp.commercetools.com',
  GCP_EU: 'https://mc-api.europe-west1.gcp.commercetools.com',
  GCP_US: 'https://mc-api.us-central1.gcp.commercetools.com',
  AWS_FRA: 'https://mc-api.eu-central-1.aws.commercetools.com',
  AWS_OHIO: 'https://mc-api.us-east-2.aws.commercetools.com',
  AWS_CN: 'https://mc-api.cn-northwest-1.aws.commercetools.cn',
} as const;

export const LOADED_CONFIG_TYPES = {
  CUSTOM_APPLICATION: 'custom-application',
  CUSTOM_VIEW: 'custom-view',
} as const;
