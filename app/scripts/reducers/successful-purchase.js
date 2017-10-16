/**
 * @module Reducers/successfulPurchase
 * @desc successfulPurchase Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { SuccessfulPurchaseConstants } from 'constants/index';

export const successfulPurchaseState = {
};

export default {
  successfulPurchase: createReducer(successfulPurchaseState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [SuccessfulPurchaseConstants.SUCCESSFUL_PURCHASE_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [SuccessfulPurchaseConstants.SUCCESSFUL_PURCHASE_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        ...action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [SuccessfulPurchaseConstants.SUCCESSFUL_PURCHASE_FETCH_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
      };
    },
  }),
};

