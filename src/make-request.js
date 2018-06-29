/**
 * Make an async request with XMLHttpRequest
 * https://stackoverflow.com/a/30008115
 *
 * @param {object} opts
 */
export function makeRequest(opts) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const method = opts.method || 'GET';

    let { params } = opts;
    // We'll need to stringify if we've been given an object
    // If we have a string, this is skipped.
    if (params && typeof params === 'object') {
      params = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    }

    xhr.open(method, `${opts.url}${params && method.toUpperCase() === 'GET' ? `?${params}` : ''}`);
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
