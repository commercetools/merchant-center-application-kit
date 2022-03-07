const MC_API_URLS = {
  'GCP-AU': 'https://mc-api.australia-southeast1.gcp.commercetools.com/tokens',
  'GCP-EU': 'https://mc-api.europe-west1.gcp.commercetools.com/tokens',
  'GCP-US': 'https://mc-api.us-central1.gcp.commercetools.com/tokens',
  'AWS-FRA': 'https://mc-api.eu-central-1.aws.commercetools.com/tokens',
  'AWS-OHIO': 'https://mc-api.us-east-2.aws.commercetools.com/tokens',
};

const DEFAULT_CREDENTIALS = {
  'GCP-AU': null,
  'GCP-EU': null,
  'GCP-US': null,
  'AWS-FRA': null,
  'AWS-OHIO': null,
};

module.exports = { MC_API_URLS, DEFAULT_CREDENTIALS };
