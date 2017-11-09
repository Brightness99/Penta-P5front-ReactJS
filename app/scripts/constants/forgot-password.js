// @flow

/**
 * @module Constants/ForgotPassword
 * @desc ForgotPassword Constants
 */

import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} ForgotPasswordConstants
 * @memberof Constants
 */
export const ForgotPasswordConstants = keyMirror({
  RESET_PASSWORD_REQUEST: undefined,
  RESET_PASSWORD_SUCCESS: undefined,
  RESET_PASSWORD_FAILURE: undefined,
  RESET_PASSWORD_CANCEL: undefined,
  SET_NEW_PASSWORD_REQUEST: undefined,
  SET_NEW_PASSWORD_SUCCESS: undefined,
  SET_NEW_PASSWORD_FAILURE: undefined,
  SET_NEW_PASSWORD_CANCEL: undefined,
  EXPIRED_INFO_REQUEST: undefined,
  EXPIRED_INFO_REQUEST_SUCCESS: undefined,
  EXPIRED_INFO_REQUEST_FAILURE: undefined,
  EXPIRED_INFO_REQUEST_CANCEL: undefined,
});
