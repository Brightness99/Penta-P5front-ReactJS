// @flow
/**
 * @module Reducers/Cart
 * @desc Cart Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';
import { CartConstants } from 'constants/index';

const cartState = {
  data: {},
  isLoaded: false,
  isRunning: false,
  count: 0,
  error: {},
};

export default {
  cart: createReducer(cartState, {
    [REHYDRATE](state, action) {
      return Object.assign({}, state, action.payload.cart, {
        rehydrated: true,
      });
    },
    [CartConstants.CART_BASIC_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        data: {
          ...state.data,
          zipcode: action.payload.zipcode,
        },
        count: action.payload.count,
      };
    },
    [CartConstants.CART_FETCH_REQUEST]() {
      return {
        ...cartState,
        isRunning: true,
      };
    },
    [CartConstants.CART_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        data: action.payload,
        isRunning: false,
        count: Object.keys(action.payload.items).length,
        isLoaded: true,
      };
    },
    [CartConstants.CART_FETCH_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },
    [CartConstants.CART_DUPLICATE_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        data: {
          ...state.data,
          items: {
            ...state.data.items,
            [action.payload.itemId]: state.data.items[action.payload.originalItemId],
          },
        },
      };
    },
    [CartConstants.CART_DELETE_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        data: {
          ...state.data,
          items: Object.keys(state.data.items)
            .filter((item) => item !== action.payload.itemId)
            .reduce((prevItem, currentItem) => ({
              ...prevItem,
              [currentItem]: state.data.items[currentItem],
            }), {}),
        },
      };
    },
  }),
};
