// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { AccountConstants } from 'constants/account';

/**
 * Product Fetch
 * @param {string} slug
 *
 * @returns {Object}
 */
export function accountFetch(): Object {
  return {
    type: AccountConstants.ACCOUNT_FETCH_REQUEST,
    payload: {},
  };
}

export function accountAddressFetch(): Object {
  return {
    type: AccountConstants.ACCOUNT_ADDRESS_FETCH_REQUEST,
    payload: {},
  };
}

export function accountUpdate(data): Object {
  return {
    type: AccountConstants.ACCOUNT_UPDATE_SUBMIT,
    payload: data,
  };
}

export function accountAddressCreate(data): Object {
  return {
    type: AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT,
    payload: data,
  };
}

export function accountAddressDelete(data): Object {
  return {
    type: AccountConstants.ACCOUNT_ADDRESS_DELETE,
    payload: data,
  };
}

export function accountNotificationFetch(): Object {
  return {
    type: AccountConstants.ACCOUNT_NOTIFICATION_FETCH_REQUEST,
    payload: {},
  };
}

/**
 * Update notifications settings
 * @param {Object} notificationData
 *
 * @returns {Object}
 */
export function accountNotificationUpdate(notificationData: {}): Object {
  return {
    type: AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT,
    payload: notificationData,
  };
}

