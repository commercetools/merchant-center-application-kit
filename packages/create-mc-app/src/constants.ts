const applicationTypes = {
  'custom-application': 'custom-application',
  'custom-view': 'custom-view',
} as const;

const availableTemplates = {
  starter: 'starter',
  'starter-typescript': 'starter-typescript',
} as const;

const supportedCloudRegions = {
  'gcp-au': 'gcp-au',
  'gcp-eu': 'gcp-eu',
  'gcp-us': 'gcp-us',
  'aws-fra': 'aws-fra',
  'aws-ohio': 'aws-ohio',
  'aws-cn': 'aws-cn',
};

export { applicationTypes, availableTemplates, supportedCloudRegions };
