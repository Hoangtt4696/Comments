require('es6-promise').polyfill();
require('isomorphic-fetch');

import _merge from 'lodash/merge';

export const fetchWithCredentials = async (url, options) => {
  options = _merge({
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }, options || {});

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  try {
    const resp = await fetch(url, options);

    return await resp.json();
  } catch(e) {
    console.error(e);
  }
};