import { ajax } from '@linx-impulse/commons-js/http/ajax';
import config from './config';

function formattedTags(tags) {
  return (tags || []).map(tag => (tag.id || tag.name));
}

function getParent(categories, item) {
  return categories.find(category => (
    Array.isArray(category.parents) && category.parents.indexOf(item.id) !== -1
  ));
}

function formattedCategories(categories) {
  // Filter wrong formatted
  const filteredCategories = (categories || []).filter(category => category && category.id);

  // Find the root node
  let item = filteredCategories.find(category => !category.parents);
  const ids = [];

  while (typeof item === 'object') {
    ids.push(item.id);
    item = getParent(filteredCategories, item);
  }
  return ids;
}

export const BannerClient = {
  getRecommendations({
    page,
    source,
    deviceId,
    showLayout,
    userId,
    homologation,
    timeout,
    categories,
    product,
    tags,
    url,
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
        params: {
          deviceId,
          page,
          source,
          showLayout,
          userId,
          homologation,
          categoryId: formattedCategories(categories),
          productId: product,
          tagId: formattedTags(tags),
          url,
        },
        success: resolve,
        error: reject,
        timeout,
      });
    });
  },
};
