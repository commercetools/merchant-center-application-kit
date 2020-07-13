import uniq from 'lodash/uniq';
import { CLOUD_IDENTIFIERS, MC_API_URLS } from './constants';

const mapCloudIdentifierToApiUrl = (
  key: typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS]
): string => {
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
      // We would probably never get to this point, as the JSON schema validation
      // kicks in before.
      throw new Error(
        `Unknown cloud identifier "${key}". Supported values: ${Object.values(
          CLOUD_IDENTIFIERS
        ).toString()}`
      );
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

const getOrThrow = <T>(fn: () => T, errorMessage: string): T => {
  try {
    return fn();
  } catch (error) {
    throw new Error(errorMessage);
  }
};

export { mapCloudIdentifierToApiUrl, getUniqueValues, getIsProd, getOrThrow };
