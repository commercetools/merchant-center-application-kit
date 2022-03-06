const MC_API_URLS = {
  GCP_AU: 'https://mc-api.australia-southeast1.gcp.commercetools.com/tokens',
  GCP_EU: 'https://mc-api.europe-west1.gcp.commercetools.com/tokens',
  GCP_US: 'https://mc-api.us-central1.gcp.commercetools.com/tokens',
  AWS_FRA: 'https://mc-api.eu-central-1.aws.commercetools.com/tokens',
  AWS_OHIO: 'https://mc-api.us-east-2.aws.commercetools.com/tokens',
};

const DEFAULT_CREDENTIALS = {
  GCP_AU: null,
  GCP_EU: null,
  GCP_US: null,
  AWS_FRA: null,
  AWS_OHIO: null,
};

module.exports = { MC_API_URLS, DEFAULT_CREDENTIALS };
