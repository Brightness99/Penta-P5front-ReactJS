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
    options: false,
  },
  isLoaded: {
    settings: false,
    source: false,
    options: false,
  },
  settings: {
    source: {
      enabledSources: {},
      showSteps: {},
      selectedSource: null,
    },
    options: {
      defaultCombinationCount: 0,
      optionSectionInfo: [],
      calculator: [],
    },
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
          ...productSettingsState.isRunning,
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
          ...state.settings,
          source: {
            enabledSources: action.payload.settings.enabled_sources,
            showSteps: action.payload.settings.show_steps,
            selectedSource: action.payload.settings.autoselect_source,
          },
        },
        isRunning: {
          ...state.isRunning,
          settings: false,
        },
        isLoaded: {
          ...state.isRunning,
          settings: true,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [SettingsConstants.SETTINGS_SOURCE_FETCH_REQUEST](state, action) {
      return {
        ...state,
        settings: {
          ...state.settings,
          source: {
            ...state.settings.source,
            selectedSource: action.payload.source,
          },
        },
        isRunning: {
          ...state.isRunning,
          source: true,
        },
      };
    },
    [SettingsConstants.SETTINGS_SOURCE_FETCH_SUCCESS](state, action) {
      const { option_section_info, calculator } = action.payload;
      const options = Object.keys(option_section_info)
        .map((item) => ({
          ...calculator[item],
          options: option_section_info[item]
            .filter((obj) => obj.visible)
            .map((optionItem) => ({
              ...optionItem,
              items: {
                ...calculator[item].options[optionItem.key],
              },
            })),
        }));
      return {
        ...state,
        isRunning: {
          ...state.isRunning,
          source: false,
        },
        isLoaded: {
          ...state.isLoaded,
          source: true,
        },
        settings: {
          ...state.settings,
          options: {
            defaultCombinationCount: action.payload.default_combination_count,
            optionSectionInfo: action.payload.option_section_info,
            itens: options,
          },
        },
        updatedAt: action.meta.updatedAt,
      };
    },
  }),
};
