const { getContentType, getSummary } = require('@promster/express');
const metrics = require('./metrics');

jest.mock('@promster/express', () => ({
  getSummary: jest.fn(),
  getContentType: () => 'application/test',
}));

const createRequest = custom => ({
  headers: {
    via: '',
  },

  ...custom,
});

const createResponse = custom => ({
  end: jest.fn(),
  setHeader: jest.fn(),

  ...custom,
});

describe('with request from google', () => {
  let request;
  let response;
  beforeEach(() => {
    request = createRequest({
      headers: {
        via: 'google',
      },
    });
    response = createResponse();

    metrics(request, response);
  });

  describe('response', () => {
    it('should should set the status code to `200`', () => {
      expect(response.statusCode).toEqual(200);
    });

    it('should not invoke `setHeader`', () => {
      expect(response.setHeader).not.toHaveBeenCalled();
    });

    it('should invoke `end` on the `response`', () => {
      expect(response.end).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should not invoke `getSummary` on the register', () => {
      expect(getSummary).not.toHaveBeenCalled();
    });
  });
});

describe('with request from anywhere else', () => {
  let request;
  let response;
  beforeEach(() => {
    request = createRequest();
    response = createResponse();

    metrics(request, response);
  });

  describe('response', () => {
    it('should should set the status code to `200`', () => {
      expect(response.statusCode).toEqual(200);
    });

    it('should invoke `setHeader` with the `register` content-type', () => {
      expect(response.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        getContentType()
      );
    });

    it('should invoke `end` on the `response` with the `getSummary` metrics', () => {
      expect(response.end).toHaveBeenCalledWith(getSummary());
    });
  });

  describe('register', () => {
    it('should invoke `getSummary` on the register', () => {
      expect(getSummary).toHaveBeenCalled();
    });
  });
});
