import { ajax } from '@linx-impulse/commons-js/http/ajax';
import { getCookie } from '@linx-impulse/commons-js/browser';
import config from './config';

function formattedTags(tags) {
  return (tags || []).map(tag => (tag.id || tag.name));
}

/* eslint-disable no-bitwise,no-multi-assign */
function generateDeviceId() {
  const s = [];
  const hexDigits = '0123456789abcdef';

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }

  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';

  let deviceId = s.join('');

  deviceId = deviceId.replace(/-/g, '');
  deviceId += String(Date.now());
  deviceId += String(Math.floor((Math.random() * 7919) + 1));

  return deviceId;
}
/* eslint-enable no-bitwise,no-multi-assign */

function getDeviceId() {
  let id = getCookie(config.cookieName.deviceId);

  if (!id) {
    id = generateDeviceId();
  }

  return id;
}

function getFirstChild(categories, item) {
  return (categories || []).find(category => (
    !category.used
    && Array.isArray(category.parents)
    && category.parents.indexOf(item.id) !== -1
  ));
}

function formattedCategories(categories) {
  // Filter wrong formatted
  const filteredCategories = (categories || [])
    .filter(category => category && category.id)
    .map(category => ({ id: category.id, parents: category.parents }));

  // Find the root node
  let item = filteredCategories.find(category => (
    (
      !category.parents || (
        Array.isArray(category.parents) && !category.parents.length
      )
    )
  ));
  const ids = [];

  while (typeof item === 'object') {
    ids.push(item.id);
    item.used = true;
    item = getFirstChild(filteredCategories, item);
  }
  return ids;
}

export const BannerClient = {
  getRecommendations({
    page,
    source,
    showLayout,
    userId,
    homologation,
    testGroup,
    timeout,
    categories,
    product,
    tags,
    url,
    searchQuery,
  } = {}) {
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
          deviceId: getDeviceId(),
          page,
          source,
          showLayout,
          userId,
          homologation,
          testGroup,
          categoryId: formattedCategories(categories),
          productId: (typeof product === 'string') ? product : (product || {}).id,
          tagId: formattedTags(tags),
          url,
          searchQuery,
        },
        success: resolve,
        error: reject,
        timeout,
      });
    });
  },
};
