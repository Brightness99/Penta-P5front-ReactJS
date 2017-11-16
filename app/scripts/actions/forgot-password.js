// @flow
/**
 * @module Actions/ForgotPassword
 * @desc Actions for Forgot password
 */

import { ForgotPasswordConstants } from 'constants/index';

/**
 * Reset Password
 * @param {string} email
 *
 * @returns {Object}
 */
export function resetPassword(email: string): Object {
  return {
    type: ForgotPasswordConstants.RESET_PASSWORD_REQUEST,
    payload: {
      email,
    },
  };
}

/**
 * Set New Password
 * @param {string} new_password
 * @param {string} hash
 *
 * @returns {Object}
 */
export function setNewPassword(new_password: string, hash: string): Object {
  return {
    type: ForgotPasswordConstants.SET_NEW_PASSWORD_REQUEST,
    payload: {
      new_password,
      hash,
    },
  };
}

/**
 * Get expired info
 * @param {string} hash
 *
 * @returns {Object}
 */
export function getExpiredInfo(hash: string) {
  return {
    type: ForgotPasswordConstants.EXPIRED_INFO_REQUEST,
    payload: {
      hash,
    },
  };
}
