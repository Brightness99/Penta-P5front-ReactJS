// @flow
/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { UserConstants, SettingsConstants } from 'constants/index';

export const userState: UserType = {
  rehydrated: false,
  isAuthorized: false,
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
  },
  socialAuthentication: {
    isRunning: false,
    error: false,
    message: '',
    userNotFound: false,
  },
  socialRegistration: {
    isRunning: false,
    error: false,
    message: '',
  },
  registration: {
    isRunning: false,
    error: false,
    message: '',
  },
  logout: {
    isRunning: false,
    error: false,
    message: '',
  },
  customerInfo: {},
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
    [UserConstants.USER_AUTH_SIGN_IN_REQUEST](state) {
      return {
        ...state,
        authentication: {
          ...state.authentication,
          isRunning: true,
          error: false,
          message: '',
        },
      };
    },
    [UserConstants.USER_AUTH_SIGN_IN_SUCCESS](state, action) {
      return {
        ...state,
        authentication: {
          ...state.authentication,
          isRunning: false,
        },
        customerInfo: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
        isAuthorized: true,
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
    [UserConstants.USER_AUTH_SIGN_IN_SOCIAL_REQUEST](state) {
      return {
        ...state,
        socialAuthentication: {
          ...state.socialAuthentication,
          isRunning: true,
          error: false,
          message: '',
          userNotFound: false,
        },
      };
    },
    [UserConstants.USER_AUTH_SIGN_IN_SOCIAL_SUCCESS](state, action) {
      return {
        ...state,
        socialAuthentication: {
          ...state.socialAuthentication,
          isRunning: false,
        },
        customerInfo: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
        isAuthorized: true,
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_AUTH_SIGN_IN_SOCIAL_FAILURE](state, action) {
      return {
        ...state,
        socialAuthentication: {
          ...state.socialAuthentication,
          error: true,
          isRunning: false,
          message: action.payload.message,
          userNotFound: true,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_AUTH_VALIDATE_REQUEST](state) {
      return {
        ...state,
        customerInfo: {
          ...state.customerInfo,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [UserConstants.USER_AUTH_VALIDATE_SUCCESS](state, action) {
      return {
        ...state,
        customerInfo: {
          ...state.customerInfo,
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
        isAuthorized: true,
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_AUTH_VALIDATE_FAILURE](state, action) {
      return {
        ...state,
        customerInfo: {
          ...state.customerInfo,
          error: action.payload,
          isRunning: false,
          isLoaded: false,
        },
      };
    },
    [UserConstants.USER_AUTH_SIGN_UP_REQUEST](state) {
      return {
        ...state,
        registration: {
          ...state.registration,
          isRunning: true,
          error: false,
          message: '',
        },
      };
    },
    [UserConstants.USER_AUTH_SIGN_UP_SUCCESS](state, action) {
      return {
        ...state,
        registration: {
          ...state.registration,
          isRunning: false,
        },
        customerInfo: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
        isAuthorized: true,
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_AUTH_SIGN_UP_FAILURE](state, action) {
      return {
        ...state,
        registration: {
          ...state.registration,
          error: true,
          isRunning: false,
          message: action.payload.message,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_AUTH_SIGN_UP_SOCIAL_REQUEST](state) {
      return {
        ...state,
        socialRegistration: {
          ...state.socialRegistration,
          isRunning: true,
          error: false,
          message: '',
        },
      };
    },
    [UserConstants.USER_AUTH_SIGN_UP_SOCIAL_SUCCESS](state, action) {
      return {
        ...state,
        socialRegistration: {
          ...state.socialRegistration,
          isRunning: false,
        },
        customerInfo: {
          ...action.payload,
          isRunning: false,
          isLoaded: true,
        },
        isAuthorized: true,
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_AUTH_SIGN_UP_SOCIAL_FAILURE](state, action) {
      return {
        ...state,
        socialRegistration: {
          ...state.socialRegistration,
          error: true,
          isRunning: false,
          message: action.payload.message,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_AUTH_LOG_OUT_REQUEST](state) {
      return {
        ...state,
        logout: {
          ...state.logout,
          isRunning: true,
          error: false,
          message: '',
        },
      };
    },
    [UserConstants.USER_AUTH_LOG_OUT_SUCCESS](state, action) {
      return {
        ...state,
        logout: {
          ...state.logout,
          isRunning: false,
        },
        customerInfo: {},
        isAuthorized: false,
        updatedAt: action.meta.updatedAt,
      };
    },
    [UserConstants.USER_AUTH_LOG_OUT_FAILURE](state, action) {
      return {
        ...state,
        logout: {
          ...state.logout,
          error: true,
          isRunning: false,
          message: action.payload.message,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
  }),
};
