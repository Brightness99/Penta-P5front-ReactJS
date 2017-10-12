// @flow
/**
 * @module Actions/FileMount
 * @desc Actions for Users
 */

import { FileMountConstants } from 'constants/index';

/**
 * FileMount Fetch
 * @param null
 *
 * @returns {Object}
 */
export function fileMountFetch(): Object {
  return {
    type: FileMountConstants.FILE_MOUNT_FETCH_REQUEST,
    payload: {},
  };
}

/**
 * File Mount Item Fetch
 /* @param {string} slug
 *
 * @returns {Object}
 */
export function fileMountItemFetch(slug: string): Object {
  return {
    type: FileMountConstants.FILE_MOUNT_ITEM_FETCH_REQUEST,
    payload: {
      slug,
    },
  };
}
