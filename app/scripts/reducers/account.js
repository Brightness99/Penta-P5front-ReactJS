/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { AccountConstants } from 'constants/index';

export const accountState = {};

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
        isRunning: true,
        isLoaded: false,
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        ...action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [AccountConstants.ACCOUNT_UPDATE_SUBMIT](state, action) {
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    },
    [AccountConstants.ACCOUNT_UPDATE_SUBMIT_SUCCESS](state, action) {
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
    [AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT](state, action) {
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT_SUCCESS](state, action) {
      state[action.payload.type.toLowerCase()].push(action.payload);
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: null,
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_CREATE_SUBMIT_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_DELETE](state, action) {
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_DELETE_SUCCESS](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: null,
      };
    },
    [AccountConstants.ACCOUNT_ADDRESS_DELETE_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },
    [AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        savedCreditCards: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE](state, action) {
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    },
    [AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE_SUCCESS](state, action) {
      const updatedCards = state.savedCreditCards.filter((item) => {
        return item.id !== action.payload.id;
      });
      return {
        ...state,
        savedCreditCards: updatedCards,
        isRunning: false,
        isLoaded: true,
        error: null,
      };
    },
    [AccountConstants.ACCOUNT_SAVED_CREDIT_CARD_DELETE_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },
  }),
};

