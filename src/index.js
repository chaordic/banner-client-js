import { makeRequest } from './make-request';
import config from './config';

export function filterEmptyFields(obj) {
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

  const params = filterEmptyFields({
    page, source, deviceId, showLayout,
  });

  return makeRequest({
    method,
    url: `${config.server.baseUrl}${config.server.recommendationUrl}`,
    params,
  }).then(JSON.parse);
}
