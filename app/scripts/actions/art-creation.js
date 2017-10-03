// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { ArtCreationConstants } from 'constants/index';

/**
 * Product Fetch
 * @param {string} id
 *
 * @returns {Object}
 */
export function proposalsFetch(id: string): Object {
  return {
    type: ArtCreationConstants.PROPOSALS_FETCH_REQUEST,
    payload: {
      id,
    },
  };
}
