import uniq from 'lodash/uniq';
import { CLOUD_IDENTIFIERS, MC_API_URLS } from './constants';

const mapCloudIdentifierToApiUrl = (
  key: typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS]
): string | undefined => {
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

const getUniqueValues = (
  initialValues: string[] = [],
  additionalValues: string[] = []
): string[] => uniq([...initialValues, ...additionalValues]);

const getIsProd = (env: NodeJS.ProcessEnv): boolean =>
  env.MC_APP_ENV
    ? env.MC_APP_ENV === 'production'
    : env.NODE_ENV === 'production';

export { mapCloudIdentifierToApiUrl, getUniqueValues, getIsProd };
