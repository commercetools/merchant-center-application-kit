export default class OptionsBuilder {
  constructor(options = {}) {
    this.options = options;
  }
  staged(useStaged) {
    this.options.useStaged = useStaged;
    return this;
  }
  page(page) {
    this.options.page = page;
    return this;
  }
  perPage(perPage) {
    this.options.perPage = perPage;
    return this;
  }
  text(term, language) {
    this.options.text = { term, language };
    return this;
  }
  filterByQuery(query) {
    if (!this.options.filterByQuery) this.options.filterByQuery = [];
    this.options.filterByQuery.push(query);
    return this;
  }
  sort(by, isSortAsc) {
    this.options.sort = { by, isSortAsc };
    return this;
  }
  where(predicate) {
    if (!this.options.where) this.options.where = [];
    if (Array.isArray(predicate)) this.options.where.push(...predicate);
    else this.options.where.push(predicate);
    return this;
  }
  expand(expansion) {
    if (!this.options.expand) this.options.expand = [];
    if (Array.isArray(expansion)) this.options.expand.push(...expansion);
    else this.options.expand.push(expansion);
    return this;
  }
  get() {
    return this.options;
  }
}
