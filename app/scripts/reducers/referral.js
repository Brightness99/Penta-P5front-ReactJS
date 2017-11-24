// @flow
/**
 * @module Reducers/Referral
 * @desc Referral Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { ReferralConstants } from 'constants/index';

export const referralState: ReferralType = {
  rehydrated: false,
  updatedAt: 0,
  error: null,
  data: {},
  total_count: 0,
  total_voucher_amount: 0,
  isRunning: false,
  isLoaded: false,
};

export default {
  referral: createReducer(referralState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [ReferralConstants.SEND_REFERRAL_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [ReferralConstants.SEND_REFERRAL_REQUEST_SUCCESS](state, action) {
      return {
        ...state,
        ...action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [ReferralConstants.SEND_REFERRAL_REQUEST_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [ReferralConstants.GET_REFERRAL_SUM](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [ReferralConstants.GET_REFERRAL_SUM_SUCCESS](state, action) {
      return {
        ...state,
        ...action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [ReferralConstants.GET_REFERRAL_SUM_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [ReferralConstants.GET_REFERRAL_HISTORY](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [ReferralConstants.GET_REFERRAL_HISTORY_SUCCESS](state, action) {
      const { data, page } = action.payload;
      return {
        ...state,
        total_count: data.total_count,
        data: Object.assign({}, state.data, {
          [page]: data.data,
        }),
        isRunning: false,
        isLoaded: true,
      };
    },
    [ReferralConstants.GET_REFERRAL_HISTORY_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
  }),
};

