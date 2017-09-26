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

/**
 * Address Delete
 * @param {number} addressId
 *
 * @returns {Object}
 */
export function accountAddressDelete(addressId: number): Object {
  return {
    type: AccountConstants.ACCOUNT_ADDRESS_DELETE,
    payload: {
      id: addressId,
    },
  };
}

export function accountSavedCreditCardFetch(): Object {
  return {
    type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_REQUEST,
    payload: {},
  };
}

export function accountNotificationFetch(): Object {
  return {
    type: AccountConstants.ACCOUNT_NOTIFICATION_FETCH_REQUEST,
    payload: {},
  };
}

export function accountSavedCreditCardDelete(data): Object {
  return {
    type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE,
    payload: data,
  };
}

export function accountNotificationUpdate(data): Object {
  return {
    type: AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT,
    payload: data,
  };
}
