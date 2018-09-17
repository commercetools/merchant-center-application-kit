/*
 * This file contains a list of all feature toggles used within
 * the app shell. Each feature toggle should be a constant.
 *
 * NOTE:
 *   Default values are not yet passed to flopflip and it has to be decided
 *   how the integrate with the plugin API.
 *   The default values would be used whenever feature toggles have not been
 *   fetched from LaunchDarkly (without default values flopflip will default
 *   them to off until fetched).
 */

// eslint-disable-next-line import/prefer-default-export
export const PROJECTS_LIST = 'projectsList';
export const ORGANIZATIONS_LIST = 'organizationsList';
export const QUICK_ACCESS = 'quickAccess';
