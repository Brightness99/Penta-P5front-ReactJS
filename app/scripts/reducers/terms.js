/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { TermsConstants } from 'constants/index';

export const termsState = {
  rehydrated: false,
  updatedAt: 0,
  terms: [],
  isRunning: false,
  isLoaded: false,
};

export default {
  terms: createReducer(termsState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [TermsConstants.TERMS_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [TermsConstants.TERMS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        terms: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
  }),
};

