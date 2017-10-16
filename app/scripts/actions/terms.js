// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { TermsConstants } from 'constants/terms';

/**
 * Product Fetch
 * @param {string} slug
 *
 * @returns {Object}
 */
export function termsFetch(): Object {
  return {
    type: TermsConstants.TERMS_FETCH_REQUEST,
    payload: {},
  };
}
