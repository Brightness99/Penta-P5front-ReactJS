// @flow

/**
 * @module Constants/Account
 * @desc Account form Constants
 */

import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @constant {Object} AccountConstants
 * @memberof Constants
 */
export const AccountConstants = keyMirror({
  ACCOUNT_FETCH_REQUEST: undefined,
  ACCOUNT_FETCH_SUCCESS: undefined,
  ACCOUNT_FETCH_FAILURE: undefined,
  ACCOUNT_FETCH_CANCEL: undefined,

  ACCOUNT_ADDRESS_FETCH_REQUEST: undefined,
  ACCOUNT_ADDRESS_FETCH_SUCCESS: undefined,
  ACCOUNT_ADDRESS_FETCH_FAILURE: undefined,
  ACCOUNT_ADDRESS_FETCH_CANCEL: undefined,

  ACCOUNT_UPDATE_SUBMIT: undefined,
  ACCOUNT_UPDATE_SUBMIT_SUCCESS: undefined,
  ACCOUNT_UPDATE_SUBMIT_FAILURE: undefined,
  ACCOUNT_UPDATE_SUBMIT_CANCEL: undefined,

  ACCOUNT_ADDRESS_CREATE_SUBMIT: undefined,
  ACCOUNT_ADDRESS_CREATE_SUBMIT_SUCCESS: undefined,
  ACCOUNT_ADDRESS_CREATE_SUBMIT_FAILURE: undefined,
  ACCOUNT_ADDRESS_CREATE_SUBMIT_CANCEL: undefined,

  ACCOUNT_ADDRESS_DELETE: undefined,
  ACCOUNT_ADDRESS_DELETE_SUCCESS: undefined,
  ACCOUNT_ADDRESS_DELETE_FAILURE: undefined,
  ACCOUNT_ADDRESS_DELETE_CANCEL: undefined,
});