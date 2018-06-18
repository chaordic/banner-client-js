const BASE_URL = 'http://banner.chaordicsystems.com/v1/recommendations';

/**
 * Make an async request with XMLHttpRequest
 * https://stackoverflow.com/a/30008115
 *
 * @param {object} opts
 */
function makeRequest(opts) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    let { params } = opts;
    // We'll need to stringify if we've been given an object
    // If we have a string, this is skipped.
    if (params && typeof params === 'object') {
      params = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    }

    xhr.open(opts.method, `${opts.url}${typeof params === 'string' ? `?${params}` : ''}`);
    xhr.onload = (res) => {
      const { status } = res.target;
      if (status >= 200 && status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = (res) => {
      const { status } = res.target;
      reject({
        status,
        statusText: xhr.statusText,
      });
    };

    if (opts.headers) {
      Object.keys(opts.headers).forEach(key => xhr.setRequestHeader(key, opts.headers[key]));
    }

    xhr.send(params);
  });
}

function getRecommendations(options) {
  const {
    page,
    source,
    deviceId,
    showLayout,
  } = options;

  const params = {
    page, source, deviceId, showLayout,
  } || {};

  return makeRequest({
    method: 'GET',
    url: BASE_URL,
    params,
  });
}

module.exports = {
  getRecommendations,
};
