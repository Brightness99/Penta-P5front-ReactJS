// @flow
/**
 * @module Actions/FileMount
 * @desc Actions for Users
 */

import { FileMountConstants } from 'constants/index';

/**
 * FileMount Fetch
 * @param {string} slug
 *
 * @returns {Object}
 */
export function fileMountFetch(slug: string): Object {
  return {
    type: FileMountConstants.FILE_MOUNT_FETCH_REQUEST,
    payload: {
      slug,
    },
  };
}
