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
  pickupPlaces: {},
  voucher: {
    isRunning: false,
    isLoaded: false,
    error: {},
    voucher_name: '',
    total: 0,
    voucher_id: '',
  },
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
    [CartConstants.CART_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
      };
    },
    [CartConstants.CART_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        data: action.payload.cart,
        isRunning: false,
        count: action.payload.cart.items ? Object.keys(action.payload.cart.items).length : 0,
        crossSelling: action.payload.crossSelling,
        isLoaded: true,
        voucher: {
          ...state.voucher,
          ...action.payload.cart.prices ? action.payload.cart.prices.discount : {},
        },
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
      const items = Object.keys(state.data.items)
        .filter((item) => item !== action.payload.itemId)
        .reduce((prevItem, currentItem) => ({
          ...prevItem,
          [currentItem]: state.data.items[currentItem],
        }), {});

      return {
        ...state,
        data: {
          ...state.data,
          items,
        },
        count: Object.keys(items).length,
      };
    },
    [CartConstants.CART_VOUCHER_ADD_FETCH_REQUEST](state) {
      return {
        ...state,
        voucher: {
          ...cartState.voucher,
          isRunning: true,
        },
      };
    },
    [CartConstants.CART_VOUCHER_ADD_FETCH_SUCCESS](state) {
      return {
        ...state,
        voucher: {
          ...state.voucher,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [CartConstants.CART_VOUCHER_ADD_FETCH_FAILURE](state, action) {
      return {
        ...state,
        voucher: {
          ...state.voucher,
          isRunning: false,
          isLoaded: true,
          error: action.payload,
        },
      };
    },
    [CartConstants.CART_VOUCHER_REMOVE_FETCH_SUCCESS](state) {
      return {
        ...state,
        voucher: cartState.voucher,
      };
    },
    [CartConstants.CART_VOUCHER_ADD_FETCH_FAILURE](state, action) {
      return {
        ...state,
        voucher: {
          ...state.voucher,
          error: action.payload,
        },
      };
    },
    [CartConstants.CART_PICKUP_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        pickupPlaces: {
          ...state.pickupPlaces,
          [action.payload.id]: action.payload,
        },
      };
    },
    [CartConstants.CART_UPDATE_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        data: {
          ...state.data,
          items: {
            ...state.data.items,
            [action.payload.itemId]: {
              ...state.data.items[action.payload.itemId],
              ...action.payload.updatedInfo,
            },
          }
        },
      };
    },
  }),
};
