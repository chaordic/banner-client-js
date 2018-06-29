import { makeRequest } from '../../src/make-request';

describe('makeRequest', function () {
  let server;
  let defaultUrl;
  let jsonData;

  beforeEach(function () {
    server = sinon.fakeServer.create();
    defaultUrl = '/test';
    jsonData = '{ "hello": "world" }';
  });

  afterEach(function () {
    server.restore();
  });

  it('should make a get request when no method is passed', function (done) {
    expect(server.requests.length).to.be.equal(0);

    makeRequest({ url: defaultUrl })
      .then((data) => {
        expect(data).to.be.equal(jsonData);
        done();
      });

    expect(server.requests.length).to.be.equal(1);
    server.requests[0].respond(
      200,
      { 'Content-Type': 'application/json' },
      jsonData,
    );

    expect(server.requests[0].method).to.be.equal('GET');
    expect(server.requests[0].url).to.be.equal(defaultUrl);
  });

  it('should make a get request but reject promise if response is an error', function (done) {
    expect(server.requests.length).to.be.equal(0);

    makeRequest({ url: defaultUrl })
      .catch(() => done());

    expect(server.requests.length).to.be.equal(1);
    server.requests[0].respond(404);

    expect(server.requests[0].method).to.be.equal('GET');
    expect(server.requests[0].url).to.be.equal(defaultUrl);
  });

  it('should make a get request but reject promise if there is a network error', function (done) {
    expect(server.requests.length).to.be.equal(0);

    makeRequest({ url: defaultUrl })
      .catch(() => done());

    expect(server.requests.length).to.be.equal(1);
    server.requests[0].error();

    expect(server.requests[0].method).to.be.equal('GET');
    expect(server.requests[0].url).to.be.equal(defaultUrl);
  });

  it('should make a get request with all passed parameters', function (done) {
    const params = { param1: 'abc', param2: 'def' };
    expect(server.requests.length).to.be.equal(0);

    makeRequest({ url: defaultUrl, params })
      .then((data) => {
        expect(data).to.be.equal(jsonData);
        done();
      });

    expect(server.requests.length).to.be.equal(1);
    server.requests[0].respond(
      200,
      { 'Content-Type': 'application/json' },
      jsonData,
    );

    expect(server.requests[0].method).to.be.equal('GET');
    expect(server.requests[0].url).to.be
      .equal(`${defaultUrl}?param1=abc&param2=def`);
  });

  it('should make a post request with all passed parameters', function (done) {
    const params = { param1: 'abc', param2: 'def' };
    expect(server.requests.length).to.be.equal(0);

    makeRequest({ url: defaultUrl, method: 'POST', params })
      .then((data) => {
        expect(data).to.be.equal(jsonData);
        done();
      });

    expect(server.requests.length).to.be.equal(1);
    server.requests[0].respond(
      201,
      { 'Content-Type': 'application/json' },
      jsonData,
    );

    expect(server.requests[0].method).to.be.equal('POST');
    expect(server.requests[0].url).to.be.equal(defaultUrl);
    expect(server.requests[0].requestBody).to.be.equal('param1=abc&param2=def');
  });
});
