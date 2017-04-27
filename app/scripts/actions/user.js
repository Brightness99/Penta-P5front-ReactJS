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
