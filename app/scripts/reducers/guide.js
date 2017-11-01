/**
 * @module Reducers/FileMount
 * @desc FileMount Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { GuideConstants } from 'constants/index';

export const guideState = {
  rehydrated: false,
  updatedAt: 0,
  guideData: {},
  isRunning: false,
  isLoaded: false,
  error: {},
};

export default {
  guide: createReducer(guideState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [GuideConstants.GUIDE_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [GuideConstants.GUIDE_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        guideData: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [GuideConstants.GUIDE_FETCH_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },
  }),
};
