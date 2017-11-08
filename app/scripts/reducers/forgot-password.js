// @flow
/**
 * @module Reducers/ForgotPassword
 * @desc ForgotPassword Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { ForgotPasswordConstants } from 'constants/index';

export const forgotPasswordState: ForgotPasswordType = {
  rehydrated: false,
  updatedAt: 0,
  data: {},
  isRunning: false,
  isLoaded: false,
  error: {},
};

export default {
  forgotPassword: createReducer(forgotPasswordState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [ForgotPasswordConstants.RESET_PASSWORD_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [ForgotPasswordConstants.RESET_PASSWORD_SUCCESS](state, action) {
      return {
        ...state,
        data: {
          ...action.payload,
        },
        isRunning: false,
        isLoaded: true,
      };
    },
    [ForgotPasswordConstants.RESET_PASSWORD_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        data: {
          ...state.data,
        },
        error: action.payload,
      };
    },
    [ForgotPasswordConstants.SET_NEW_PASSWORD_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [ForgotPasswordConstants.SET_NEW_PASSWORD_SUCCESS](state) {
      return {
        ...state,
        data: {},
        isRunning: false,
        isLoaded: true,
      };
    },
    [ForgotPasswordConstants.SET_NEW_PASSWORD_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        data: {
          ...state.data,
        },
        error: action.payload,
      };
    },
  }),
};
