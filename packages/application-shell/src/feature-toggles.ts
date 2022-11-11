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

export const UI_REDESIGN = 'uiRedesign';

export const FLAGS = {
  [UI_REDESIGN]: false,
};
