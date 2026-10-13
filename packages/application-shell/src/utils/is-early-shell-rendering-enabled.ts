type TEnvironmentWithEarlyShellRendering = {
  enableEarlyShellRendering?: boolean | string;
};

/**
 * Whether the shell chrome renders before the locale data is available.
 *
 * Accepts the string form too: values in an application config's
 * `additionalEnv` usually come from `${env:...}` placeholders, so they reach
 * `window.app` as strings.
 */
const isEarlyShellRenderingEnabled = (
  environment: TEnvironmentWithEarlyShellRendering
) => String(environment.enableEarlyShellRendering) === 'true';

export default isEarlyShellRenderingEnabled;
