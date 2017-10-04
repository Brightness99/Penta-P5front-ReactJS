// @flow
/**
 * @module Actions/Users
 * @desc Actions for Users
 */

import { AccountConstants } from 'constants/account';

/**
 * Account Fetch
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

/**
 * Delete Saved Credit Card
 * @param {number} cardId
 *
 * @returns {Object}
 */
export function accountSavedCreditCardDelete(cardId: number): Object {
  return {
    type: AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE,
    payload: {
      id: cardId,
    },
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

/**
 * Order Detail Fetch
 * @param {number} orderId
 *
 * @returns {Object}
 */
export function accountOrderDetailFetch(orderId: number): Object {
  return {
    type: AccountConstants.ACCOUNT_ORDER_DETAIL_FETCH_REQUEST,
    payload: {
      id: orderId,
    },
  };
}

/**
 * Order List Fetch
 * @param {number} page
 *
 * @returns {Object}
 */
export function accountOrdersFetch(page: number): Object {
  return {
    type: AccountConstants.ACCOUNT_ORDER_FETCH_REQUEST,
    payload: {
      order: 'desc',
      sort: 'created_at',
      page,
      perPage: 10,
    },
  };
}
