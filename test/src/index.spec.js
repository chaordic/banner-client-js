import * as request from '../../src/make-request';
import config from '../../src/config';
import { BannerClient } from '../../src';

describe('BannerClient.getRecommendations', function () {
  let defaultMethod;
  let defaultUrl;

  before(function () {
    defaultMethod = 'GET';
    defaultUrl = `${config.server.baseUrl}${config.server.recommendationUrl}`;
  });

  beforeEach(function () {
    sinon.spy(request, 'makeRequest');
  });

  afterEach(function () {
    request.makeRequest.restore();
  });

  it('should make a get request without params to defaultUrl', function () {
    expect(request.makeRequest).to.not.have.been.called;
    BannerClient.getRecommendations();

    expect(request.makeRequest).to.have.been.calledWith({
      method: defaultMethod,
      url: defaultUrl,
      params: null,
    });
  });

  it('should make a get request with all parameters to defaultUrl', function () {
    const page = 'page';
    const source = 'source';
    const deviceId = 'deviceId';
    const showLayout = true;

    expect(request.makeRequest).to.not.have.been.called;
    BannerClient.getRecommendations({
      page, source, deviceId, showLayout,
    });

    expect(request.makeRequest).to.have.been.calledWith({
      method: defaultMethod,
      url: defaultUrl,
      params: {
        page, source, deviceId, showLayout,
      },
    });
  });
});
