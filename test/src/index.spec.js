import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import * as request from '../../src/make-request';
import { getRecommendations, buildParams } from '../../src';

const expect = chai.expect;
chai.use(sinonChai);

describe('getRecommendations', function() {
  let defaultMethod;
  let defaultUrl;

  beforeEach(function() {
    request.makeRequest = sinon.spy();
    defaultMethod = 'GET';
    defaultUrl = 'http://banner.chaordicsystems.com/v1/recommendations';
  });

  it('should make a get request without params to defaultUrl', function() {
    expect(request.makeRequest).to.not.have.been.called;
    getRecommendations();

    expect(request.makeRequest).to.have.been.calledWith({
      method: defaultMethod,
      url: defaultUrl,
      params: null,
    });
  });

  it('should make a get request with all parameters to defaultUrl', function() {
    const page = 'page';
    const source = 'source';
    const deviceId = 'deviceId';
    const showLayout = true;

    expect(request.makeRequest).to.not.have.been.called;
    getRecommendations({ page, source, deviceId, showLayout });

    expect(request.makeRequest).to.have.been.calledWith({
      method: defaultMethod,
      url: defaultUrl,
      params: { page, source, deviceId, showLayout },
    });
  });
});

describe('buildParams', function() {
  it('should returns all values of an object which is a valid value', function() {
    const baseObj = {
      key1: true,
      key2: false,
      key3: 'something',
      key4: 2,
      key5: 0,
      key6: undefined,
      key7: null,
    };

    const newObbj = buildParams(baseObj);

    expect(newObbj).to.be.deep.equal({
      key1: true,
      key3: 'something',
      key4: 2,
    });
  });

  it('should returns null if there are no valid values in object', function() {
    const baseObj = {
      key2: false,
      key5: 0,
      key6: undefined,
      key7: null,
    };

    const newObbj = buildParams(baseObj);

    expect(newObbj).to.be.equal(null);
  });
});
