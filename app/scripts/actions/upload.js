// @flow
/**
 * @module Actions/Upload
 * @desc Actions for Social login settings
 */

import { UploadConstants } from 'constants/index';

/**
 * Fetching upload info
 *
 * @param {object} data
 *
 * @returns {Object}
 */
export function uploadFetch(data: {}): Object {
  return {
    type: UploadConstants.UPLOAD_FETCH_REQUEST,
    payload: data,
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
 *
 * @returns {Object}
 */
export function uploadFinishRequest(data: {}): Object {
  return {
    type: UploadConstants.UPLOAD_FINISH_REQUEST,
    payload: data,
  };
}

/**
 * upload set orientation request
 *
 * @param {object} data
 *
 * @returns {Object}
 */
export function uploadSetOrientationRequest(data: {}): Object {
  return {
    type: UploadConstants.UPLOAD_SET_ORIENTATION_REQUEST,
    payload: data,
  };
}
