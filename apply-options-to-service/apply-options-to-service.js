// This can be removed once the javascript-sdk supports building requests as
// objects. But we have to migrate first anyways.
// (https://commercetools.github.io/nodejs/sdk/)
export default function applyOptionsToService(options, service) {
  if ({}.hasOwnProperty.call(options, 'staged')) service.staged(options.staged);

  if ({}.hasOwnProperty.call(options, 'page')) service.page(options.page);

  if ({}.hasOwnProperty.call(options, 'perPage'))
    service.perPage(options.perPage);

  if (options.text) service.text(options.text.term, options.text.language);

  if (options.filterByQuery)
    options.filterByQuery.forEach(query => service.filterByQuery(query));

  if ({}.hasOwnProperty.call(options, 'byId')) service.byId(options.byId);

  if (options.sort) service.sort(options.sort.by, options.sort.asc);

  if (options.where)
    options.where.forEach(predicate => service.where(predicate));

  if (options.expand)
    if (Array.isArray(options.expand))
      options.expand.forEach(expansion => service.expand(expansion));
    else service.expand(options.expand);
}
