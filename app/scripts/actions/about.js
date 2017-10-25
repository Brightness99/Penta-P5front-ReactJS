// @flow
/**
 * @module Actions/About
 * @desc Actions for About
 */

import { AboutConstants } from 'constants/about';

/**
 * About Fetch
 *
 * @returns {Object}
 */
export function aboutFetch(): Object {
  return {
    type: AboutConstants.ABOUT_FETCH_REQUEST,
    payload: {},
  };
}
