/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { PolicyConstants } from 'constants/index';

export const policyState = {
  rehydrated: false,
  updatedAt: 0,
  policy: [],
  isRunning: false,
  isLoaded: false,
};

export default {
  policy: createReducer(policyState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [PolicyConstants.POLICY_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [PolicyConstants.POLICY_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        policy: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
  }),
};

