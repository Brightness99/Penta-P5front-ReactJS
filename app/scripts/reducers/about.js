/**
 * @module Reducers/About
 * @desc About Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { AboutConstants } from 'constants/index';

export const termsState = {
  rehydrated: false,
  updatedAt: 0,
  about: {},
  isRunning: false,
  isLoaded: false,
};

export default {
  about: createReducer(termsState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [AboutConstants.ABOUT_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [AboutConstants.ABOUT_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        about: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [AboutConstants.ABOUT_FETCH_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  }),
};

