// @flow
/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { HeaderConstants } from 'constants/index';

export type HeaderState = {
  rehydrated: boolean,
  productCategories: {
    error: boolean,
    isRunning: boolean,
    message: string,
    isLoaded: boolean,
    categories: []
  },
  updatedAt: number,
};

export const headerState:HeaderState = {
  rehydrated: false,
  productCategories: {
    error: false,
    isRunning: false,
    message: '',
    categories: [],
  },
  updatedAt: 0,
};

export default {
  header: createReducer(headerState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [HeaderConstants.HEADER_PRODUCT_CATEGORIES_FETCH_REQUEST](state) {
      return {
        ...state,
        productCategories: {
          ...headerState.productCategories,
          isRunning: true,
          error: false,
          message: '',
        },
      };
    },
    [HeaderConstants.HEADER_PRODUCT_CATEGORIES_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        productCategories: {
          ...headerState.productCategories,
          isRunning: false,
          categories: action.payload,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [HeaderConstants.HEADER_PRODUCT_CATEGORIES_FETCH_FAILURE](state, action) {
      return {
        ...state,
        productCategories: {
          ...headerState.productCategories,
          error: true,
          isRunning: false,
          message: action.payload.message,
          subscribed: false,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
  }),
};
