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
      list: [],
    },
  },
  selection: {},
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
            .map((optionItem) => ({
              ...optionItem,
              items: [
                ...calculator[item].options[optionItem.key].sort((a, b) => a.position - b.position),
              ],
            })),
        }));

      const selection = Object.keys(action.payload.calculator)
        .reduce((prevItem, currentItem) => ({
          ...prevItem,
          [currentItem]: Object.keys(action.payload.calculator[currentItem].options).reduce((prevOption, nextOption) => ({
            ...prevOption,
            [nextOption]: action.payload.calculator[currentItem].options[nextOption]
              .filter((optionItem) => optionItem.default)
              .reduce((prevOptionItem, nextOptionItem) => nextOptionItem.id, ''),
          }), {}),
        }), {});
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
            list: options,
          },
        },
        selection,
        updatedAt: action.meta.updatedAt,
      };
    },
    [SettingsConstants.SETTINGS_OPTIONS_FETCH_REQUEST](state, action) {
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.payload.id]: action.payload.selection,
        }
      };
    },
  }),
};
