// @flow
/**
 * @module Actions/PrintiPress
 * @desc Actions for Printi Press
 */

import { PrintiPressConstants } from 'constants/index';

/**
 * Printi press Fetch
 * @param {number} page
 *
 * @returns {Object}
 */
export function printiPressFetch(page: number): Object {
  return {
    type: PrintiPressConstants.PRINTI_PRESS_FETCH_REQUEST,
    payload: {
      page,
    },
  };
}
