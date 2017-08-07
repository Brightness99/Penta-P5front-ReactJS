// @flow
/**
 * @module API
 * @desc API functions
 */
import { Observable } from 'rxjs/Observable';

import config from 'config';

/**
 * Fetch data with RxJS Ajax
 *
 * @instance
 * @param {Object} action
 * @param {string} [action.endpoint] - URL Endpoint
 * @param {string} [action.method] - Request method ( GET, POST, PUT, ... ).
 * @param {string} [action.payload] - Request body.
 * @param {Object} [action.headers]
 *
 * @returns {Stream}
 */
export function rxAjax(action: Object = {}) {
  const errors = [];
  const settings = {};

  if (!action.method) {
    action.method = 'GET';
  }

  if (!action.endpoint) {
    errors.push('endpoint');
  }

  if (!action.payload && (action.method !== 'GET' && action.method !== 'DELETE')) {
    errors.push('payload');
  }

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join('`, `')}\``);
  }

  /* istanbul ignore else */
  if (action.headers) {
    settings.headers = {
      ...settings.headers,
      ...action.headers,
    };
  }

  /* istanbul ignore else */
  if (!action.url) {
    action.url = config.apiUrl;
    settings.withCredentials = true;
    settings.headers = {
      ...settings.headers,
      'Application-Source': 'react',
      'api-key': config.apiKey,
    };
  }

  settings.url = `${action.url}${action.endpoint}`;
  settings.method = action.method;
  settings.crossDomain = true;

  settings.responseType = 'json';
  settings.user = 'printi';
  settings.password = '2016alphaprotect';

  settings.headers = {
    ...settings.headers,
    'Content-Type': settings.headers['Content-Type'] || 'application/json',
  };

  if (action.method !== 'GET') {
    settings.body = action.payload;
  }

  return Observable.ajax(settings);
}
