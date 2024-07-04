const applicationTypes = {
  'custom-application': 'custom-application',
  'custom-view': 'custom-view',
} as const;

const availableTemplates = {
  starter: 'starter',
  'starter-typescript': 'starter-typescript',
} as const;

export { applicationTypes, availableTemplates };
