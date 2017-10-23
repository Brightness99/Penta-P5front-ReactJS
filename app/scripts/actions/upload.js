// @flow
/**
 * @module Actions/Upload
 * @desc Actions for Social login settings
 */

import { UploadConstants } from 'constants/index';

/**
 * Fetching upload info
 *
 * @param {string} slug
 * @param {string} itemId
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

/**
 * upload file request
 *
 * @param {Object} file
 *
 * @returns {Object}
 */
export function uploadFileRequest(file: {}): Object {
  return {
    type: UploadConstants.UPLOAD_FILE_REQUEST,
    payload: file,
  };
}

/**
 * upload file cancel
 *
 * @returns {Object}
 */
export function uploadFileCancel(): Object {
  return {
    type: UploadConstants.UPLOAD_FILE_CANCEL,
  };
}

/**
 * upload finish reuest
 *
 * @param {Object} data
 * @param {string} itemId
 *
 * @returns {Object}
 */
export function uploadFinishRequest(data: {}, itemId: string): Object {
  return {
    type: UploadConstants.UPLOAD_FINISH_REQUEST,
    payload: {
      data,
      itemId,
    },
  };
}
