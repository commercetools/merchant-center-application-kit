// `packages/l10n` reads this through `babel-plugin-preval`, which Vite doesn't run,
// so the import would land on a CJS file with no default export. Synced by hand.
const supportedLocales = ['en', 'de', 'es', 'fr-FR', 'pt-BR'];

export default supportedLocales;
