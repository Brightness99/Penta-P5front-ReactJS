// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { PolicyConstants } from 'constants/policy';

/**
 * Policy Fetch
 * @param {string} slug
 *
 * @returns {Object}
 */
export function policyFetch(): Object {
  return {
    type: PolicyConstants.POLICY_FETCH_REQUEST,
    payload: {},
  };
}
