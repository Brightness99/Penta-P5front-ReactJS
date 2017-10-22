/**
 * @module Constants/Upload
 * @desc Upload Constants
 */

import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} UploadConstants
 * @memberof Constants
 */
export const UploadConstants = keyMirror({
  UPLOAD_FETCH_REQUEST: undefined,
  UPLOAD_FETCH_SUCCESS: undefined,
  UPLOAD_FETCH_FAILURE: undefined,
  UPLOAD_FETCH_CANCEL: undefined,
  UPLOAD_FILE_REQUEST: undefined,
  UPLOAD_FILE_PROGRESS: undefined,
  UPLOAD_FILE_SUCCESS: undefined,
  UPLOAD_FILE_FAILURE: undefined,
  UPLOAD_FILE_CANCEL: undefined,
  UPLOAD_FILE_CANCEL_SUCCESS: undefined,
});
