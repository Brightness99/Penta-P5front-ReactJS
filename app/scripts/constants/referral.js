// @flow
/**
 * @module Constants/Referral
 * @desc Referral Constants
 */

import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} ReferralConstants
 * @memberof Constants
 */
export const ReferralConstants = keyMirror({
  SEND_REFERRAL_REQUEST: undefined,
  SEND_REFERRAL_REQUEST_SUCCESS: undefined,
  SEND_REFERRAL_REQUEST_FAILURE: undefined,
  SEND_REFERRAL_REQUEST_CANCEL: undefined,
  //
  GET_REFERRAL_SUM: undefined,
  GET_REFERRAL_SUM_SUCCESS: undefined,
  GET_REFERRAL_SUM_FAILURE: undefined,
  GET_REFERRAL_SUM_CANCEL: undefined,
  //
  GET_REFERRAL_HISTORY: undefined,
  GET_REFERRAL_HISTORY_SUCCESS: undefined,
  GET_REFERRAL_HISTORY_FAILURE: undefined,
  GET_REFERRAL_HISTORY_CANCEL: undefined,
});
