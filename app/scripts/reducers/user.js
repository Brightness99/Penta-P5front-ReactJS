/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { UserConstants, SettingsConstants } from 'constants/index';

export const userState = {
  rehydrated: false,
  newsletter: {
    component: '',
    error: false,
    isRunning: false,
    message: '',
    subscribed: false,
  },
  authentication: {
    isRunning: false,
    error: false,
    message: '',
    signInForm: {
      email: '',
      password: '',
    },
    customerInfo: {},
  },
  address: {
    isZipcodeValid: false,
    zipcode: '',
    zipcodeErrorMessage: '',
  },
  updatedAt: 0,
};

export default {
  user: createReducer(userState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [UserConstants.USER_NEWSLETTER_REQUEST](state, action) {
      return {
        ...state,
        newsletter: {
          ...userState.newsletter,
          component: action.payload.component,
          isRunning: true,
        },
      };
    },
    [UserConstants.USER_NEWSLETTER_SUCCESS](state, action) {
      return {
        ...state,
        newsletter: {
          ...state.newsletter,
          isRunning: false,
          message: action.payload.message,
          subscribed: true,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_NEWSLETTER_FAILURE](state, action) {
      return {
        ...state,
        newsletter: {
          ...state.newsletter,
          error: true,
          isRunning: false,
          message: action.payload.message,
          subscribed: false,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [SettingsConstants.SETTINGS_ZIPCODE_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        address: {
          ...state.address,
          isZipcodeValid: true,
          zipcode: action.payload.zipcode,
        },
      };
    },
    [SettingsConstants.SETTINGS_ZIPCODE_FETCH_FAILURE](state, action) {
      return {
        ...state,
        address: {
          ...state.address,
          isZipcodeValid: false,
          zipcode: action.payload.zipcode,
          zipcodeErrorMessage: action.payload.message,
        },
      };
    },
    [SettingsConstants.SETTINGS_ZIPCODE_RESET](state) {
      return {
        ...state,
        address: {
          ...state.address,
          isZipcodeValid: false,
          zipcode: '',
          zipcodeErrorMessage: '',
        },
      };
    },
    [UserConstants.USER_AUTH_SIGN_IN_REQUEST](state, action) {
      return {
        ...state,
        authentication: {
          ...state.authentication,
          signInForm: action.payload,
          isRunning: true,
        },
      };
    },
    [UserConstants.USER_AUTH_SIGN_IN_SUCCESS](state, action) {
      return {
        ...state,
        authentication: {
          ...state.authentication,
          isRunning: false,
          customerInfo: action.payload,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_AUTH_SIGN_IN_FAILURE](state, action) {
      return {
        ...state,
        authentication: {
          ...state.authentication,
          error: true,
          isRunning: false,
          message: action.payload.message,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
  }),
};
