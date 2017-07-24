// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { BlogConstants } from 'constants/blog';

/**
 * Product Fetch
 * @param {string} slug
 *
 * @returns {Object}
 */
export function blogFetch(): Object {
  return {
    type: BlogConstants.BLOG_FETCH_REQUEST,
    payload: {},
  };
}
