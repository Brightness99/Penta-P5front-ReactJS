// @flow

/**
 * @module Actions/Cart
 * @desc Actions for Cart
 */

import { LocaleConstants } from 'constants/index';

/**
 * Fetch Locale
 *
 * @returns {Object}
 */
export function localeFetch(): Object {
  return {
    type: LocaleConstants.LOCALE_FETCH_REQUEST,
    payload: {},
  };
}
