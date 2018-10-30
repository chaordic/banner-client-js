import * as cmAjax from '@linx-impulse/commons-js/http/ajax';

import { BannerClient } from '../../src';

describe('BannerClient.getRecommendations', function () {
  beforeEach(function () {
    this.ajaxStub = sinon.stub(cmAjax, 'ajax');
  });

  afterEach(function () {
    this.ajaxStub.restore();
  });

  it('should reject when no page is provided', function () {
    return BannerClient.getRecommendations({
      source: 'desktop',
    }).catch((err) => {
      expect(this.ajaxStub).to.not.have.been.called;
      expect(err).to.be.instanceOf(TypeError);
    });
  });

  it('should reject when no source is provided', function () {
    return BannerClient.getRecommendations({
      page: 'home',
    }).catch((err) => {
      expect(this.ajaxStub).to.not.have.been.called;
      expect(err).to.be.instanceOf(TypeError);
    });
  });

  it('should make an ajax request with params provided', function () {
    const paramsClient = {
      source: 'desktop',
      page: 'home',
      showLayout: true,
      userId: 'user',
      homologation: true,
      url: '',
    };

    const params = {
      page: 'home',
      source: 'desktop',
      showLayout: true,
      userId: 'user',
      homologation: true,
      categoryId: [],
      productId: undefined,
      tagId: [],
      url: '',
    };

    this.ajaxStub.yieldsTo('success', {});

    return BannerClient.getRecommendations(paramsClient).then(() => {
      expect(this.ajaxStub)
        .to
        .have
        .been
        .calledWithMatch(sinon.match({ params }));
    });
  });

  it('should resolve with data sent from ajax response', function () {
    const params = {
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

  it('should pass formattedCategories to ajax request', function () {
    const categories = [
      {
        id: 'Autoajuda',
        name: 'Autoajuda',
        parents: ['Livros']
      },
      {
        id: 'Livros',
        name:'Livros'
      },
      {
        id: 'Desenvolvimento Pessoal',
        name: 'Desenvolvimento Pessoal',
        parents: ['Autoajuda' ]
      }
    ];

    const paramsClient = {
      source: 'desktop',
      page: 'home',
      showLayout: true,
      categories,
    };

    const params = {
      categoryId: ['Livros', 'Autoajuda', 'Desenvolvimento Pessoal'],
      homologation: undefined,
      page: 'home',
      productId: undefined,
      showLayout: true,
      source: 'desktop',
      tagId: [],
      url: undefined,
      userId: undefined,
    };

    this.ajaxStub.yieldsTo('success', {});

    return BannerClient.getRecommendations(paramsClient).then(() => {
      expect(this.ajaxStub)
        .to
        .have
        .been
        .calledWithMatch(sinon.match({ params }));
    });
  });

  it('should pass formattedTags to ajax request', function () {
    const tags = [
      {
        id: 'Autoajuda',
        name: 'Autoajuda',
      },
      {
        id: 'Livros',
        name:'Livros'
      },
      {
        id: 'Desenvolvimento Pessoal',
        name: 'Desenvolvimento Pessoal',
      }
    ];

    const paramsClient = {
      source: 'desktop',
      page: 'home',
      showLayout: true,
      tags,
    };

    const params = {
      categoryId: [],
      homologation: undefined,
      page: 'home',
      productId: undefined,
      showLayout: true,
      source: 'desktop',
      tagId: ['Autoajuda', 'Livros', 'Desenvolvimento Pessoal'],
      url: undefined,
      userId: undefined,
    };

    this.ajaxStub.yieldsTo('success', {});

    return BannerClient.getRecommendations(paramsClient).then(() => {
      expect(this.ajaxStub)
        .to
        .have
        .been
        .calledWithMatch(sinon.match({ params }));
    });
  });

  it('should pass product to ajax request', function () {
    const paramsClient = {
      source: 'desktop',
      page: 'home',
      showLayout: true,
      product: { id: 'prd-00'}
    };

    const params = {
      categoryId: [],
      homologation: undefined,
      page: 'home',
      productId: 'prd-00',
      showLayout: true,
      source: 'desktop',
      tagId: [],
      url: undefined,
      userId: undefined,
    };

    this.ajaxStub.yieldsTo('success', {});

    return BannerClient.getRecommendations(paramsClient).then(() => {
      expect(this.ajaxStub)
        .to
        .have
        .been
        .calledWithMatch(sinon.match({ params }));
    });
  });
});
