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
  isRunning: false,
  isLoaded: false,
  settings: {
    showSteps: {
      source: false,
      options: false,
      matrix: false,
      additional_options: false,
    },
  },
  source: {
    enabledSources: {},
    selectedSource: null,
    isRunning: false,
    isLoaded: false,
  },
  options: {
    defaultCombinationCount: 0,
    list: [],
    isRunning: false,
    isLoaded: false,
  },
  calculator: {},
  finalProduct: {},
  optionSectionInfo: {},
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
        isRunning: true,
      };
    },
    [SettingsConstants.SETTINGS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        product: action.payload.product,
        finalProduct: action.payload.finalProduct,
        source: {
          ...state.source,
          enabledSources: action.payload.settings.enabled_sources,
          selectedSource: action.payload.settings.autoselect_source,
        },
        settings: {
          showSteps: action.payload.settings.show_steps,
        },
        isRunning: false,
        isLoaded: true,
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
        source: {
          ...state.settings.source,
          selectedSource: action.payload.source,
          isRunning: true,
        },
      };
    },
    [SettingsConstants.SETTINGS_SOURCE_FETCH_SUCCESS](state, action) {
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
        source: {
          ...state.source,
          isRunning: false,
          isLoaded: true,
        },
        calculator: action.payload.calculator,
        finalProduct: action.payload.final_product,
        optionSectionInfo: action.payload.option_section_info,
        defaultCombinationCount: action.payload.default_combination_count,
        selection,
        updatedAt: action.meta.updatedAt,
      };
    },
    [SettingsConstants.SETTINGS_OPTIONS_FETCH_REQUEST](state, action) {
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.payload.partId]: action.payload.selection,
        },
      };
    },
    [SettingsConstants.SETTINGS_OPTIONS_FETCH_SUCCESS](state, action) {
      const calculator = Object.keys(state.calculator).map((calculate) => ({
        ...state.calculator[calculate],
        options: {
          ...state.calculator[calculate].options,
          ...action.payload.options[calculate],
        },
      }))
        .reduce((prevValue, currentValue) => ({
          ...prevValue,
          [currentValue.id]: currentValue,
        }), {});

      const selection = Object.keys(action.payload.options).map((part) => ({
        key: part,
        value: action.payload.partId === part ? Object.keys(action.payload.options[part]).map((select) => {
          const thisSelection = action.payload.options[part][select];

          if (thisSelection.length === 1) {
            return {
              key: select,
              value: thisSelection[0].id,
            };
          }

          return {
            key: select,
            value: '',
          };
        })
          .reduce((prevValue, currentValue) => ({
            ...prevValue,
            [currentValue.key]: currentValue.value,
          }), { ...state.selection[part] }) : state.selection[action.payload.partId],
      }))
        .reduce((prevValue, currentValue) => ({
          ...prevValue,
          [currentValue.key]: currentValue.value,
        }), {});

      return {
        ...state,
        calculator,
        selection,
        updatedAt: action.meta.updatedAt,
      };
    },
  }),
};
