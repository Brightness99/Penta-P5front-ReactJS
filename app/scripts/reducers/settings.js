/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer, updateSelection } from 'utils';

import { SettingsConstants } from 'constants/index';

export const productSettingsState = {
  rehydrated: false,
  updatedAt: 0,
  isRunning: false,
  isLoaded: false,
  config: {
    showSteps: {
      source: false,
      options: false,
      matrix: false,
      additional_options: false,
    },
    isFulfilled: {
      source: false,
      options: false,
      matrix: false,
    },
  },
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
  matrix: {
    rows: {},
    dates: {},
    isRunning: false,
    isLoaded: false,
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
        isRunning: true,
      };
    },
    [SettingsConstants.SETTINGS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        config: {
          ...state.config,
          showSteps: action.payload.settings.show_steps,
          isFulfilled: {
            ...state.config.isFulfilled,
            source: !!action.payload.settings.autoselect_source,
          },
        },
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
        options: productSettingsState.options,
        matrix: productSettingsState.matrix,
        isRunning: false,
        isLoaded: true,
        updatedAt: action.meta.updatedAt,
      };
    },
    [SettingsConstants.SETTINGS_SOURCE_FETCH_REQUEST](state, action) {
      return {
        ...state,
        config: {
          ...state.config,
          isFulfilled: {
            ...state.config.isFulfilled,
            source: true,
          },
        },
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
      const actionSelection = Object.keys(state.optionSectionInfo)
        .map((part) => ({
          key: part,
          values: state.optionSectionInfo[part]
            .reduce((prevSection, currentSection) => {
              let sectionValue = '';

              if (action.payload.partId === part) {
                sectionValue = action.payload.selection[currentSection.key] || '';
              }

              return {
                ...prevSection,
                [currentSection.key]: sectionValue,
              };
            }, {}),
        }))
        .reduce((prevValue, currentValue) => ({
          ...prevValue,
          [currentValue.key]: currentValue.values,
        }), {});

      return {
        ...state,
        selection: updateSelection(state.selection, actionSelection),
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

      const actionSelection = Object.keys(state.selection)
        .map((part) => ({
          key: part,
          value: Object.keys(action.payload.options[part])
            .map((select) => {
              if (action.payload.options[part][select].length === 1) {
                return {
                  key: select,
                  value: action.payload.options[part][select][0].id,
                };
              }

              if (action.payload.partId === part && action.payload.selection[select]) {
                return {
                  key: select,
                  value: action.payload.selection[select],
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
            }), {}),
        }))
        .reduce((prevValue, currentValue) => ({
          ...prevValue,
          [currentValue.key]: currentValue.value,
        }), {});

      return {
        ...state,
        calculator,
        selection: updateSelection(state.selection, actionSelection),
        updatedAt: action.meta.updatedAt,
      };
    },
    [SettingsConstants.SETTINGS_ZIPCODE_FETCH_REQUEST](state) {
      return {
        ...state,
        matrix: productSettingsState.matrix,
      };
    },
    [SettingsConstants.SETTINGS_ZIPCODE_FETCH_SUCCESS](state) {
      return {
        ...state,
        matrix: {
          ...state.matrix,
          isRunning: true,
          isLoaded: false,
        }
      };
    },
    [SettingsConstants.SETTINGS_MATRIX_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        matrix: {
          rows: action.payload.rows,
          dates: action.payload.dates,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
  }),
};
