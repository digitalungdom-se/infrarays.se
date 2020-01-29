import 'cross-fetch/polyfill';

function parseCookies(response) {
  const raw = response.headers.raw()['set-cookie'];
  return raw
    .map(entry => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      return cookiePart;
    })
    .join(';');
}

const esc = encodeURIComponent;
export const query = params =>
  Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');

function betterFetch(url, oldOptions = { method: 'get' }) {
  const { keepCookie, ...options } = oldOptions;
  let queries = '';
  if (options.method === undefined) options.method = 'get';
  if (options.method.toLowerCase() === 'get' && options.body !== undefined) {
    queries = `?${query(options.body)}`;
    delete options.body;
  }
  return fetch(url + queries, options)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        let cookie;
        if (keepCookie) {
          cookie = parseCookies(response);
        }
        return response.json().then(res => {
          if (keepCookie) res.setCookies = cookie;
          if (res.type === 'fail') {
            const error = new Error();
            error.response = res;
            throw error;
          } else return res;
        });
      }
      const { statusText, status } = response;
      return response
        .json()
        .then(res => {
          const error = new Error(`${statusText} ${status}`);
          error.response = res;
          throw error;
        })
        .catch(err => {
          const error = new Error(err);
          error.status = status;
          error.statusText = statusText;
          error.fetchError = true;
          throw error;
        });
    })
    .catch(err => {
      console.log(err);
      let error;
      // was the error NOT a fetch error
      if (err.response === undefined) error = { ...err };
      else error = err.response;
      throw error;
    });
}

export default betterFetch;
