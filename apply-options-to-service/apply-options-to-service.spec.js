import applyOptionsToService from './apply-options-to-service';

const createServiceMock = () => ({
  staged: jest.fn(),
  page: jest.fn(),
  perPage: jest.fn(),
  text: jest.fn(),
  filterByQuery: jest.fn(),
  sort: jest.fn(),
  where: jest.fn(),
  expand: jest.fn(),
});

describe('applyOptionsToService', () => {
  let serviceMock;
  beforeEach(() => {
    serviceMock = createServiceMock();
  });
  describe('when setting "staged"', () => {
    beforeEach(() => {
      applyOptionsToService({ staged: true }, serviceMock);
    });
    it('should call "staged"', () => {
      expect(serviceMock.staged).toHaveBeenCalledWith(true);
    });
  });
  describe('when setting "page"', () => {
    beforeEach(() => {
      applyOptionsToService({ page: 2 }, serviceMock);
    });
    it('should call "page"', () => {
      expect(serviceMock.page).toHaveBeenCalledWith(2);
    });
  });
  describe('when setting "perPage"', () => {
    beforeEach(() => {
      applyOptionsToService({ perPage: 2 }, serviceMock);
    });
    it('should call "perPage"', () => {
      expect(serviceMock.perPage).toHaveBeenCalledWith(2);
    });
  });
  describe('when setting "text"', () => {
    beforeEach(() => {
      applyOptionsToService(
        { text: { term: 'foo', language: 'en' } },
        serviceMock
      );
    });
    it('should call "text"', () => {
      expect(serviceMock.text).toHaveBeenCalledWith('foo', 'en');
    });
  });
  describe('when setting "filterByQuery"', () => {
    beforeEach(() => {
      applyOptionsToService({ filterByQuery: ['foo'] }, serviceMock);
    });
    it('should call "filterByQuery"', () => {
      expect(serviceMock.filterByQuery).toHaveBeenCalledWith('foo');
    });
  });
  describe('when setting "sort"', () => {
    describe('when sorting ascending', () => {
      beforeEach(() => {
        applyOptionsToService({ sort: { by: 'foo', asc: true } }, serviceMock);
      });
      it('should call "sort"', () => {
        expect(serviceMock.sort).toHaveBeenCalledWith('foo', true);
      });
    });
    describe('when sorting descending', () => {
      beforeEach(() => {
        applyOptionsToService({ sort: { by: 'foo', asc: false } }, serviceMock);
      });
      it('should call "sort"', () => {
        expect(serviceMock.sort).toHaveBeenCalledWith('foo', false);
      });
    });
  });
  describe('when setting "where"', () => {
    beforeEach(() => {
      applyOptionsToService({ where: ['foo'] }, serviceMock);
    });
    it('should call "where"', () => {
      expect(serviceMock.where).toHaveBeenCalledWith('foo');
    });
  });
  describe('when setting "expand"', () => {
    beforeEach(() => {
      applyOptionsToService({ expand: ['foo'] }, serviceMock);
    });
    it('should call "expand"', () => {
      expect(serviceMock.expand).toHaveBeenCalledWith('foo');
    });
  });
});
