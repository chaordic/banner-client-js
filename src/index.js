import { makeRequest } from './make-request';

const BASE_REC_URL = 'http://banner.chaordicsystems.com/v1/recommendations';

export function buildParams(obj) {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  });

  return Object.keys(newObj).length > 0 ? newObj : null;
}

export function getRecommendations(options) {
  const method = 'GET';
  const {
    page,
    source,
    deviceId,
    showLayout,
  } = options || {};

  const params = buildParams({
    page, source, deviceId, showLayout,
  });

  return makeRequest({
    method,
    url: BASE_REC_URL,
    params,
  }).then(JSON.parse);
}
