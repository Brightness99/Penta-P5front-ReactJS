/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { ProductConstants } from 'constants/index';

export const productsState = {
  rehydrated: false,
  updatedAt: 0,
  product: {},
  isRunning: false,
  isLoaded: false,
};

export default {
  products: createReducer(productsState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [ProductConstants.PRODUCT_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [ProductConstants.PRODUCT_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        ...action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
  }),
};

