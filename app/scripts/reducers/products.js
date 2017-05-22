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
};

export default {
  products: createReducer(productsState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [ProductConstants.PRODUCT_FETCH_REQUEST](state, action) {
      console.log(state, action);
      return {
        ...state,
      };
    },
  }),
};
