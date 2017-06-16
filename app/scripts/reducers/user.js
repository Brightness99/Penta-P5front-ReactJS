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
  address: {
    zipcode: '',
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
          ...state.matrix,
          zipcode: action.payload.zipcode,
        },
      };
    },
  }),
};
