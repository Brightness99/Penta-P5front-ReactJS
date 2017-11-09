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
 * @param {number} isVertical
 *
 * @returns {Object}
 */
export function uploadFetch(slug: string, itemId: string, isVertical: number): Object {
  return {
    type: UploadConstants.UPLOAD_FETCH_REQUEST,
    payload: {
      slug,
      itemId,
      isVertical,
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
 * upload finish request
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

/**
 * upload set orientation request
 *
 * @param {string} itemId
 * @param {number} isVertical
 *
 * @returns {Object}
 */
export function uploadSetOrientationRequest(itemId: string, isVertical: number): Object {
  return {
    type: UploadConstants.UPLOAD_SET_ORIENTATION_REQUEST,
    payload: {
      itemId,
      isVertical,
    },
  };
}
