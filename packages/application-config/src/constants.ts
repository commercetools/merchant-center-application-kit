export const CLOUD_IDENTIFIERS = {
  GCP_AU: 'gcp-au',
  GCP_EU: 'gcp-eu',
  GCP_US: 'gcp-us',
  AWS_EU: 'aws-eu',
  AWS_US: 'aws-us',
  /**
   * @deprecated: use `AWS_EU` instead
   */
  AWS_FRA: 'aws-fra',
  /**
   * @deprecated: use `AWS_US` instead
   */
  AWS_OHIO: 'aws-ohio',
} as const;

export const MC_API_URLS = {
  [CLOUD_IDENTIFIERS.GCP_AU]:
    'https://mc-api.australia-southeast1.gcp.commercetools.com',
  [CLOUD_IDENTIFIERS.GCP_EU]:
    'https://mc-api.europe-west1.gcp.commercetools.com',
  [CLOUD_IDENTIFIERS.GCP_US]:
    'https://mc-api.us-central1.gcp.commercetools.com',
  [CLOUD_IDENTIFIERS.AWS_EU]:
    'https://mc-api.eu-central-1.aws.commercetools.com',
  [CLOUD_IDENTIFIERS.AWS_US]: 'https://mc-api.us-east-2.aws.commercetools.com',
  /**
   * @deprecated: use `AWS_EU` instead
   */
  [CLOUD_IDENTIFIERS.AWS_FRA]:
    'https://mc-api.eu-central-1.aws.commercetools.com',
  /**
   * @deprecated: use `AWS_US` instead
   */
  [CLOUD_IDENTIFIERS.AWS_OHIO]:
    'https://mc-api.us-east-2.aws.commercetools.com',
} as const;

export const LOADED_CONFIG_TYPES = {
  CUSTOM_APPLICATION: 'custom-application',
  CUSTOM_VIEW: 'custom-view',
} as const;
