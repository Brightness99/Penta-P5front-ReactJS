// @flow
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
