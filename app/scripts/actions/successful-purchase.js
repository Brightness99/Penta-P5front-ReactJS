// @flow
/**
 * @module Successful Purchase
 * @desc Successful Purchase
 */

import { SuccessfulPurchaseConstants } from 'constants/successful-purchase';

/**
 * Successful Purchase Fetch
 * @param {number} orderId
 *
 * @returns {Object}
 */
export function successfulPurchaseFetch(orderId: number): Object {
  return {
    type: SuccessfulPurchaseConstants.SUCCESSFUL_PURCHASE_FETCH_REQUEST,
    payload: {
      id: orderId,
    },
  };
}
