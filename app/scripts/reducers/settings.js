/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { SettingsConstants } from 'constants/index';

export const productSettingsState = {
  rehydrated: false,
  updatedAt: 0,
  isRunning: {
    settings: false,
    source: false,
  },
  isLoaded: {
    settings: false,
    source: false,
  },
  settings: {
    autoselectSource: null,
    enabledSources: {},
    showSteps: {},
    selectedSource: null,
  },
};

export default {
  productSettings: createReducer(productSettingsState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [SettingsConstants.SETTINGS_FETCH_REQUEST]() {
      return {
        ...productSettingsState,
        isRunning: {
          settings: true,
        },
      };
    },
    [SettingsConstants.SETTINGS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        product: action.payload.product,
        finalProduct: action.payload.finalProduct,
        settings: {
          autoselectSource: action.payload.settings.autoselect_source,
          enabledSources: action.payload.settings.enabled_sources,
          showSteps: action.payload.settings.show_steps,
          selectedSource: action.payload.settings.autoselect_source,
        },
        isRunning: {
          settings: false,
        },
        isLoaded: {
          settings: true,
        },
      };
    },
    [SettingsConstants.SETTINGS_SOURCE_FETCH_REQUEST](state, action) {
      return {
        ...state,
        isRunning: {
          source: true,
        },
        settings: {
          ...state.settings,
          selectedSource: action.payload.source,
        },
      };
    },
    [SettingsConstants.SETTINGS_SOURCE_FETCH_SUCCESS](state) {
      return {
        ...state,
      };
    },
  }),
};
