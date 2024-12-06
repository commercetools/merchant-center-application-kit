/**
 * This hook script is executed by the "pnpm run omlet:scan" after the scan phase.
 * It is used to add metadata to the scanned components.
 * @see https://docs.omlet.dev/discover-omlet/learn-omlet-cli/custom-component-properties#scanning-with-a-hook-script
 * @type {import('@omlet/cli').CliHookModule}
 */
module.exports = {
  async afterScan(components) {
    for (const component of components) {
      if (!component.filePath) {
        /** = component from external component library */
        component.setMetadata('package_name', component.component.package_name);
      }
    }
  },
};
