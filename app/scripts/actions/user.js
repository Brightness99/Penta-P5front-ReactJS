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
 * @param {object} userForm
 *
 * @returns {Object}
 */
export function userSignIn(userForm): Object {
  return {
    type: UserConstants.USER_AUTH_SIGN_IN_REQUEST,
    payload: userForm,
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
 * Customer social authentication
 *
 * @param {object} userForm
 *
 * @returns {Object}
 */
export function userSocialSignIn(userForm): Object {
  return {
    type: UserConstants.USER_AUTH_SIGN_IN_SOCIAL_REQUEST,
    payload: userForm,
  };
}

/**
 * Customer social registration
 *
 * @param {user} user
 *
 * @returns {Object}
 */
export function userSocialSignUp(user): Object {
  return {
    type: UserConstants.USER_AUTH_SIGN_UP_SOCIAL_REQUEST,
    payload: user,
  };
}

/**
 * Customer logout
 *
 * @returns {Object}
 */
export function userLogOut(): Object {
  return {
    type: UserConstants.USER_AUTH_LOG_OUT_REQUEST,
    payload: {},
  };
}


/**
 * Customer authorization validate
 *
 * @returns {Object}
 */
export function userAuthValidate(): Object {
  return {
    type: UserConstants.USER_AUTH_VALIDATE_REQUEST,
    payload: {},
  };
}
