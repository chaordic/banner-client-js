import * as cmAjax from '@linx-impulse/commons-js/http/ajax';

import { BannerClient } from '../../src';

describe('BannerClient.getRecommendations', function () {
  beforeEach(function () {
    this.ajaxStub = sinon.stub(cmAjax, 'ajax');
  });

  afterEach(function () {
    this.ajaxStub.restore();
  });

  it('should reject when no deviceId is provided', function () {
    return BannerClient.getRecommendations({
      page: 'home',
      source: 'desktop',
    }).catch((err) => {
      expect(this.ajaxStub).to.not.have.been.called;
      expect(err).to.be.instanceOf(TypeError);
    });
  });

  it('should reject when no page is provided', function () {
    return BannerClient.getRecommendations({
      deviceId: 'device',
      source: 'desktop',
    }).catch((err) => {
      expect(this.ajaxStub).to.not.have.been.called;
      expect(err).to.be.instanceOf(TypeError);
    });
  });

  it('should reject when no source is provided', function () {
    return BannerClient.getRecommendations({
      deviceId: 'device',
      page: 'home',
    }).catch((err) => {
      expect(this.ajaxStub).to.not.have.been.called;
      expect(err).to.be.instanceOf(TypeError);
    });
  });

  it('should make an ajax request with params provided', function () {
    const params = {
      deviceId: 'device',
      source: 'desktop',
      page: 'home',
      showLayout: true,
    };

    this.ajaxStub.yieldsTo('success', {});

    return BannerClient.getRecommendations(params).then(() => {
      expect(this.ajaxStub)
        .to
        .have
        .been
        .calledWithMatch(sinon.match({ params }));
    });
  });

  it('should resolve with data sent from ajax response', function () {
    const params = {
      deviceId: 'device',
      source: 'desktop',
      page: 'home',
      showLayout: true,
    };

    const data = [{ id: 'banner1' }, { id: 'banner2' }];
    this.ajaxStub.yieldsTo('success', data);

    return expect(BannerClient.getRecommendations(params))
      .to
      .eventually
      .be
      .deep
      .equal(data);
  });

  it('should reject with error sent from ajax request', function () {
    const params = {
      deviceId: 'device',
      source: 'desktop',
      page: 'home',
      showLayout: true,
    };

    const err = new Error('error');
    this.ajaxStub.yieldsTo('error', err);

    return expect(BannerClient.getRecommendations(params))
      .to
      .eventually
      .be
      .rejectedWith(err);
  });
});
