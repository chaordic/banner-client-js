import { ajax } from '@linx-impulse/commons-js/http/ajax';
import config from './config';

export const BannerClient = {
  getRecommendations({
    page,
    source,
    deviceId,
    showLayout,
    userId,
    homologation,
  } = {}) {
    if (!deviceId) {
      return Promise.reject(new TypeError('deviceId is required to get banners'));
    }

    if (!page) {
      return Promise.reject(new TypeError('page is required to get banners'));
    }

    if (!source) {
      return Promise.reject(new TypeError('source is required to get banners'));
    }

    return new Promise((resolve, reject) => {
      ajax({
        url: `${config.server.baseUrl}${config.server.recommendationUrl}`,
        params: { deviceId, page, source, showLayout, userId, homologation },
        success: resolve,
        error: reject,
      });
    });
  },
};
