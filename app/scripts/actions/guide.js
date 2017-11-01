// @flow
/**
 * @module Actions/Guide
 * @desc Actions for Guide
 */

import { GuideConstants } from 'constants/index';

/**
 * File Mount Item Fetch
 * @param {string} slug
 *
 * @returns {Object}
 */
export function guideFetch(slug: string): Object {
  return {
    type: GuideConstants.GUIDE_FETCH_REQUEST,
    payload: {
      slug,
    },
  };
}
