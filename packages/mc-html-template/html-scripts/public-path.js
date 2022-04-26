window.__dynamicImportHandler__ = function (importer) {
  return `${window.app.cdnUrl.replace(/\/$/, '')}/${importer.replace(
    /^(\.\/)?/,
    ''
  )}`;
};
window.__dynamicImportPreload__ = function (preloads) {
  return preloads.map(
    (preload) => `${window.app.cdnUrl.replace(/\/$/, '')}/${preload}`
  );
};
