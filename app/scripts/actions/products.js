// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { ProductConstants } from 'constants/index';

/**
 * Product Fetch
 * @param {string} slug
 *
 * @returns {Object}
 */
export function productFetch(slug: string): Object {
  return {
    type: ProductConstants.PRODUCT_FETCH_REQUEST,
    payload: {
      slug,
    },
  };
}
