// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { UserConstants } from 'constants/index';

/**
 * Newsletter signup
 * @param {string} email
 * @param {string} component
 * @param {object} locale
 *
 * @returns {Object}
 */
export function userNewsletterSignup(
  email: string,
  component: string = 'footer',
  locale: {
    SUCCESS: string,
    FAILURE: string
  } = {},
): Object {
  return {
    type: UserConstants.USER_NEWSLETTER_REQUEST,
    payload: {
      email,
      component,
      locale,
    },
  };
}

/**
 * Customer authentication
 *
 * @param {string} email
 * @param {string} password
 *
 * @returns {Object}
 */
export function userSignIn(email: string, password: string): Object {
  return {
    type: UserConstants.USER_AUTH_SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

/**
 * Customer registration
 *
 * @param {user} user
 *
 * @returns {Object}
 */
export function userSignUp(user): Object {
  return {
    type: UserConstants.USER_AUTH_SIGN_UP_REQUEST,
    payload: user,
  };
}

/**
 * Customer logout
 *
 * @param {string} email
 * @param {string} password
 *
 * @returns {Object}
 */
export function userLogOut(email: string, password: string): Object {
  return {
    type: UserConstants.USER_AUTH_LOG_OUT_REQUEST,
    payload: { email, password },
  };
}
