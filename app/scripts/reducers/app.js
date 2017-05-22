// @flow
/**
 * @module Reducers/App
 * @desc App Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer, getScreenSize } from 'utils/helpers';
import { AppConstants } from 'constants/index';


export const appState = {
  screenSize: getScreenSize(),
  config: {
    viewType: 'gallery',
  },
  rehydrated: false,
};

export default {
  app: createReducer(appState, {
    [REHYDRATE](state, action) {
      return Object.assign({}, state, action.payload.app, {
        rehydrated: true,
      });
    },
    [AppConstants.UPDATE_BROWSER_OPTIONS](state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    [AppConstants.UPDATE_CONFIG_VIEW_TYPE](state, action) {
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload,
        },
      };
    },
  }),
};
