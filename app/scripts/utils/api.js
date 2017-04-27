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
  if (!action.url) {
    action.url = config.apiUrl;
  }

  settings.url = `${action.url}${action.endpoint}`;
  settings.method = action.method;
  settings.crossDomain = true;
  settings.withCredentials = true;
  settings.responseType = 'json';

  settings.headers = {
    'Content-Type': 'application/json',
    'api-key': config.apiKey,
  };

  if (action.method !== 'GET') {
    settings.body = action.payload;
  }

  return Observable.ajax(settings);
}
