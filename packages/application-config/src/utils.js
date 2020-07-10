import uniq from 'lodash.uniq';

export const CLOUD_IDENTIFIERS = {
  GCP_AU: 'gcp-au',
  GCP_EU: 'gcp-eu',
  GCP_US: 'gcp-us',
  AWS_FRA: 'aws-fra',
  AWS_OHIO: 'aws-ohio',
};

export const MC_API_URLS = {
  GCP_AU: 'https://mc-api.australia-southeast1.gcp.commercetools.com',
  GCP_EU: 'https://mc-api.europe-west1.gcp.commercetools.com',
  GCP_US: 'https://mc-api.us-central1.gcp.commercetools.com',
  AWS_FRA: 'https://mc-api.eu-central-1.aws.commercetools.com',
  AWS_OHIO: 'https://mc-api.us-east-2.aws.commercetools.com',
};

const mapCloudIdentifierToApiUrl = (key) => {
  switch (key) {
    case CLOUD_IDENTIFIERS.GCP_AU:
      return MC_API_URLS.GCP_AU;
    case CLOUD_IDENTIFIERS.GCP_EU:
      return MC_API_URLS.GCP_EU;
    case CLOUD_IDENTIFIERS.GCP_US:
      return MC_API_URLS.GCP_US;
    case CLOUD_IDENTIFIERS.AWS_FRA:
      return MC_API_URLS.AWS_FRA;
    case CLOUD_IDENTIFIERS.AWS_OHIO:
      return MC_API_URLS.AWS_OHIO;
    default:
      return undefined;
  }
};

const getUniqueValues = (initialValues = [], additionalValues = []) =>
  uniq([...initialValues, ...additionalValues]).filter(Boolean);

export { mapCloudIdentifierToApiUrl, getUniqueValues };
