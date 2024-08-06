/*
 * This file contains a list of all feature toggles used within
 * the app shell. Each feature toggle should be a constant.
 *
 * ```
 * export const FEATURE_TOGGLE_NAME = 'featureToggleName';
 * export const FLAGS = {
 *   [FEATURE_TOGGLE_NAME]: false,
 * };
 * ```
 *
 * NOTE:
 *   Default values are not yet passed to flopflip and it has to be decided
 *   how the integrate with the plugin API.
 *   The default values would be used whenever feature toggles have not been
 *   fetched from LaunchDarkly (without default values flopflip will default
 *   them to off until fetched).
 */

export const CUSTOM_VIEWS = 'enableCustomViews';
export const ENABLE_WORKSPACES_UI = 'enableWorkspacesUi';

export const FLAGS = {};

// Long-lived feature flags, defined in the MC API.
export const DEFAULT_FLAGS = {
  [CUSTOM_VIEWS]: { value: true },
  // TODO: set to false before making the PR
  [ENABLE_WORKSPACES_UI]: { value: true },
};
