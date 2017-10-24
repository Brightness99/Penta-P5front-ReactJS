/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { AccountConstants } from 'constants/index';

export const accountState = {
  savedCreditCards: {},
  notification: {},
  addresses: {},
  selectedOrder: {},
  zipcodeValid: {},
  orders: {
    list: [],
    total_count: 0,
    isRunning: false,
    isLoaded: false,
  },
  loyalty: {},
};

export default {
  account: createReducer(accountState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [AccountConstants.ACCOUNT_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [AccountConstants.ACCOUNT_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        ...action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_FETCH_REQUEST](state) {
      return {
        ...state,
        addresses: {
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        addresses: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_FETCH_FAILURE](state) {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [AccountConstants.ACCOUNT_UPDATE_SUBMIT](state, action) {
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    },
    [AccountConstants.ACCOUNT_UPDATE_SUBMIT_SUCCESS](state) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: null,
      };
    },
    [AccountConstants.ACCOUNT_UPDATE_SUBMIT_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT](state) {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          isAddressCreating: true,
          isAddressCreatingCalled: false,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT_SUCCESS](state, action) {
      state.addresses[action.payload.type.toLowerCase()].push(action.payload);

      return {
        ...state,
        addresses: {
          ...state.addresses,
          isAddressCreating: false,
          isAddressCreatingCalled: true,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT_FAILURE](state, action) {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          isAddressCreating: false,
          isAddressCreatingCalled: true,
          error: action.payload,
        },
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_FORM_RESET](state) {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          isAddressCreating: false,
          isAddressCreatingCalled: false,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_DELETE](state) {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_DELETE_SUCCESS](state, action) {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          billing: state.addresses.billing.filter((item) => item.id !== action.payload.id),
          shipping: state.addresses.shipping.filter((item) => item.id !== action.payload.id),
          isRunning: false,
          isLoaded: true,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_DELETE_FAILURE](state, action) {
      return {
        ...state,
        addresses: {
          isRunning: false,
          isLoaded: true,
          error: action.payload,
        },
      };
    },
    [AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_REQUEST](state) {
      return {
        ...state,
        savedCreditCards: {
          cards: [],
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        savedCreditCards: {
          cards: action.payload,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE](state) {
      return {
        ...state,
        savedCreditCards: {
          ...state.savedCreditCards,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE_SUCCESS](state, action) {
      return {
        ...state,
        savedCreditCards: {
          cards: state.savedCreditCards.cards.filter((item) => item.id !== action.payload.id),
          isRunning: false,
          isLoaded: true,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT_SUCCESS](state, action) {
      return {
        ...state,
        notification: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT_FAILURE](state, action) {
      return {
        ...state,
        notification: {
          ...state.notification,
          isRunning: false,
          isLoaded: true,
          error: action.payload,
        },
      };
    },
    [AccountConstants.ACCOUNT_NOTIFICATION_FETCH_REQUEST](state) {
      return {
        ...state,
        notification: {
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [AccountConstants.ACCOUNT_NOTIFICATION_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        notification: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [AccountConstants.ACCOUNT_NOTIFICATION_FETCH_FAILURE](state, action) {
      return {
        ...state,
        notification: {
          ...state.notification,
          isRunning: false,
          isLoaded: true,
          error: action.payload,
        },
      };
    },
    [AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT](state, action) {
      return {
        ...state,
        notification: {
          ...state.notification,
          ...action.payload,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT_SUCCESS](state, action) {
      return {
        ...state,
        notification: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
          error: null,
        },
      };
    },
    [AccountConstants.ACCOUNT_NOTIFICATION_UPDATE_SUBMIT_FAILURE](state, action) {
      return {
        ...state,
        notification: {
          ...state.notification,
          isRunning: false,
          isLoaded: true,
          error: action.payload,
        },
      };
    },
    [AccountConstants.ACCOUNT_ORDER_DETAIL_FETCH_REQUEST](state) {
      return {
        ...state,
        selectedOrder: {
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [AccountConstants.ACCOUNT_ORDER_FETCH_REQUEST](state) {
      return {
        ...state,
        orders: {
          list: state.orders.isLoaded ? state.orders.list : accountState.orders.list,
          total_count: 0,
          isRunning: true,
          isLoaded: state.orders.isLoaded,
        },
      };
    },
    [AccountConstants.ACCOUNT_ORDER_DETAIL_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        selectedOrder: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [AccountConstants.ACCOUNT_ORDER_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        orders: {
          list: !state.isLoaded ? action.payload.list : state.orders.list.concat(action.payload.list),
          total_count: action.payload.total_count,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [AccountConstants.ACCOUNT_ORDER_DETAIL_FETCH_FAILURE](state) {
      return {
        ...state,
        selectedOrder: {
          ...state.selectedOrder,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [AccountConstants.ACCOUNT_ORDER_FETCH_FAILURE](state, action) {
      return {
        ...state,
        orders: {
          ...state.orders,
          isRunning: false,
          isLoaded: true,
          error: action.payload,
        },
      };
    },
    [AccountConstants.ACCOUNT_ZIPCODE_VALIDATE_REQUEST](state) {
      return {
        ...state,
        zipcodeValid: {
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [AccountConstants.ACCOUNT_LOYALTY_FETCH_REQUEST](state) {
      return {
        ...state,
        loyalty: {
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [AccountConstants.ACCOUNT_ZIPCODE_VALIDATE_SUCCESS](state, action) {
      return {
        ...state,
        zipcodeValid: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [AccountConstants.ACCOUNT_LOYALTY_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        loyalty: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [AccountConstants.ACCOUNT_ZIPCODE_VALIDATE_FAILURE](state) {
      return {
        ...state,
        zipcodeValid: {
          isRunning: false,
          isLoaded: true,
          error: {
            message: 'Invalid Zipcode',
          },
        },
      };
    },
    [AccountConstants.ACCOUNT_LOYALTY_FETCH_FAILURE](state, action) {
      return {
        ...state,
        loyalty: {
          ...state.loyalty,
          isRunning: false,
          isLoaded: true,
          error: action.payload,
        },
      };
    },
  }),
};

