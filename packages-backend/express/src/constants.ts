export const CLOUD_IDENTIFIERS = {
  GCP_AU: 'gcp-au',
  GCP_EU: 'gcp-eu',
  GCP_US: 'gcp-us',
  AWS_FRA: 'aws-fra',
  AWS_OHIO: 'aws-ohio',
  AWS_CN: 'aws-cn',
  AZR_US: 'azr-us',
} as const;

export const MC_API_URLS = {
  GCP_AU: 'https://mc-api.australia-southeast1.gcp.commercetools.com',
  GCP_EU: 'https://mc-api.europe-west1.gcp.commercetools.com',
  GCP_US: 'https://mc-api.us-central1.gcp.commercetools.com',
  AWS_FRA: 'https://mc-api.eu-central-1.aws.commercetools.com',
  AWS_OHIO: 'https://mc-api.us-east-2.aws.commercetools.com',
  AWS_CN: 'https://mc-api.cn-northwest-1.aws.commercetools.cn',
  AZR_US: 'https://mc-api.eastus1.azure.commercetools.com',
} as const;

export const MC_API_PROXY_HEADERS = {
  FORWARD_TO_VERSION: 'x-mc-api-forward-to-version',
  CLOUD_IDENTIFIER: 'x-mc-api-cloud-identifier',
} as const;
