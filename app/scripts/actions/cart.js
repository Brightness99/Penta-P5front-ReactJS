// @flow

import StringMask from 'string-mask';

/**
 * @module Actions/Cart
 * @desc Actions for Cart
 */

import { CartConstants } from 'constants/cart';

/**
 * Basic Cart Fetch
 *
 * @returns {Object}
 */
export function cartBasicFetch(): Object {
  return {
    type: CartConstants.CART_BASIC_FETCH_REQUEST,
    payload: {},
  };
}

/**
 * Cart Fetch
 *
 * @returns {Object}
 */
export function cartFetch(): Object {
  return {
    type: CartConstants.CART_FETCH_REQUEST,
    payload: {},
  };
}

/**
 * Cart Fetch
 *
 * @returns {Object}
 */
export function cartAddFetch(): Object {
  return {
    type: CartConstants.CART_ADD_FETCH_REQUEST,
    payload: {},
  };
}

/**
 * Cart Duplicate Item Fetch
 * @param {string} itemId
 *
 * @returns {Object}
 */
export function cartDuplicateFetch(itemId: string): Object {
  return {
    type: CartConstants.CART_DUPLICATE_FETCH_REQUEST,
    payload: {
      itemId,
    },
  };
}

/**
 * Cart Delete Fetch
 * @param {string} itemId
 *
 * @returns {Object}
 */
export function cartDeleteFetch(itemId: string): Object {
  return {
    type: CartConstants.CART_DELETE_FETCH_REQUEST,
    payload: {
      itemId,
    },
  };
}

/**
 * Cart Voucher Add Fetch
 * @param {string} voucher
 *
 * @returns {Object}
 */
export function cartVoucherAddFetch(voucher: string): Object {
  return {
    type: CartConstants.CART_VOUCHER_ADD_FETCH_REQUEST,
    payload: {
      voucher,
    },
  };
}


/**
 * Cart Voucher Remove Fetch
 * @param {string} voucher
 *
 * @returns {Object}
 */
export function cartVoucherRemoveFetch(voucher: string): Object {
  return {
    type: CartConstants.CART_VOUCHER_REMOVE_FETCH_REQUEST,
    payload: {
      voucher,
    },
  };
}


/**
 * Cart Pickup Places Fetch
 * @param {number} zipcode
 *
 * @returns {Object}
 */
export function cartPickupFetch(pickupPlaceId: number): Object {
  return {
    type: CartConstants.CART_PICKUP_FETCH_REQUEST,
    payload: {
      pickupPlaceId,
    },
  };
}


/**
 * Cart Update Fetch
 * @param {number} itemId
 * @param {Object} updatedInfo
 *
 * @returns {Object}
 */
export function cartUpdateFetch(itemId: number, updatedInfo: Object): Object {
  return {
    type: CartConstants.CART_UPDATE_FETCH_REQUEST,
    payload: {
      itemId,
      updatedInfo,
    },
  };
}
