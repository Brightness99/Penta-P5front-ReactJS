// @flow
/**
 * @module Actions/Upload
 * @desc Actions for Social login settings
 */

import { UploadConstants } from 'constants/index';

/**
 * Fetching social login settings
 *
 * @returns {Object}
 */
export function uploadFetch(slug: string, itemId: string): Object {
  return {
    type: UploadConstants.UPLOAD_FETCH_REQUEST,
    payload: {
      slug,
      itemId,
    },
  };
}
