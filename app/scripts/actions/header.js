// @flow
import { HeaderConstants } from 'constants/index';

/**
 * @module Actions/Header
 * @desc Actions for Header
 */

/**
 * Fetch product categories
 *
 * @returns {Object}
 */
export function productCategoriesFetch(): Object {
  return {
    type: HeaderConstants.HEADER_PRODUCT_CATEGORIES_FETCH_REQUEST,
  };
}
