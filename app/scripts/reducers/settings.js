/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer, getSelection, isSelectionComplete } from 'utils';
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
    zipcode: {
      value: '',
      isZipcodeValid: false,
      zipcodeErrorMessage: '',
    },
    pickupPlaces: [],
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
    parts: [],
    isRunning: false,
    isLoaded: false,
    removed: [],
    isSelectionComplete: false,
  },
  templates: {
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
    selection: {
      date: 0,
      quantity: 0,
    },
    isRunning: false,
    isLoaded: false,
    deliveryMethod: 'zipcode',
  },
  additionalOptions: {},
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
          ...state.source,
          selectedSource: action.payload.source,
          isRunning: true,
        },
        options: productSettingsState.options,
        matrix: productSettingsState.matrix,
      };
    },
    [SettingsConstants.SETTINGS_SOURCE_FETCH_SUCCESS](state, action) {
      const selection = getSelection(action.payload.product.parts);

      return {
        ...state,
        source: {
          ...state.source,
          isRunning: false,
          isLoaded: true,
        },
        options: {
          ...state.options,
          defaultCombinationCount: action.payload.default_combination_count,
          parts: action.payload.product.parts,
          selectionIsComplete: isSelectionComplete(selection),
        },
        selection,
        updatedAt: action.meta.updatedAt,
      };
    },
    [SettingsConstants.SETTINGS_SOURCE_RESET](state) {
      return {
        ...state,
        source: {
          ...state.source,
          selectedSource: '',
        },
        options: productSettingsState.options,
        selection: productSettingsState.selection,
      };
    },
    [SettingsConstants.SETTINGS_OPTIONS_FETCH_REQUEST](state, action) {
      let shouldReset = false;

      return {
        ...state,
        options: {
          ...state.options,
          selectionIsComplete: false,
        },
        selection: state.options.parts
          .reduce((prevPart, currentPart) => {
            if (currentPart.id === action.payload.partId) {
              shouldReset = true;
            }

            if (!shouldReset) {
              return {
                ...prevPart,
                [currentPart.id]: state.selection[currentPart.id],
              };
            }

            return {
              ...prevPart,
              [currentPart.id]: currentPart.attributes
                .reduce((prevAttribute, currentAttribute) => ({
                  ...prevAttribute,
                  [currentAttribute.key]: currentPart.id === action.payload.partId ? action.payload.selection[currentPart.id][currentAttribute.key] : '',
                }), {}),
            };
          }, {}),
      };
    },
    [SettingsConstants.SETTINGS_OPTIONS_FETCH_SUCCESS](state, action) {
      const parts = [
        ...state.options.parts.map((part) => ({
          ...part,
          attributes: part.attributes.map((attribute) => ({
            ...attribute,
            options: action.payload.options[part.id] && action.payload.options[part.id][attribute.key]
              ? action.payload.options[part.id][attribute.key].map((option) => ({
                ...option,
                imageSmall: option.image_small,
                imageBig: option.image_big,
              }))
              : attribute.options,
          })),
        })),
      ];

      const selection = parts
        .reduce((prevPart, currentPart) => ({
          ...prevPart,
          [currentPart.id]: currentPart.attributes
            .reduce((prevAttribute, currentAttribute) => ({
              ...prevAttribute,
              [currentAttribute.key]: (state.selection && state.selection[currentPart.id] && state.selection[currentPart.id][currentAttribute.key])
              || (currentAttribute.options.length === 1 && currentAttribute.options[0].id) || '',
            }), {}),
        }), {});

      return {
        ...state,
        options: {
          ...state.options,
          parts,
          selectionIsComplete: isSelectionComplete(selection),
        },
        selection,
        updatedAt: action.meta.updatedAt,
      };
    },
    [SettingsConstants.SETTINGS_ZIPCODE_FETCH_REQUEST](state, action) {
      return {
        ...state,
        config: {
          ...state.config,
          zipcode: {
            ...productSettingsState.config.zipcode,
            value: action.payload.zipcode,
          },
        },
        matrix: productSettingsState.matrix,
      };
    },
    [SettingsConstants.SETTINGS_ZIPCODE_FETCH_SUCCESS](state) {
      return {
        ...state,
        config: {
          ...state.config,
          zipcode: {
            ...state.config.zipcode,
            isZipcodeValid: true,
          },
        },
        matrix: {
          ...state.matrix,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [SettingsConstants.SETTINGS_ZIPCODE_FETCH_FAILURE](state, action) {
      return {
        ...state,
        config: {
          ...state.config,
          zipcode: {
            ...state.config.zipcode,
            isZipcodeValid: false,
            zipcodeErrorMessage: action.payload,
          },
        },
        matrix: productSettingsState.matrix,
      };
    },
    [SettingsConstants.SETTINGS_ZIPCODE_RESET](state) {
      return {
        ...state,
        config: {
          ...state.config,
          zipcode: productSettingsState.config.zipcode,
        },
        matrix: productSettingsState.matrix,
      };
    },
    [SettingsConstants.SETTINGS_MATRIX_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        matrix: {
          ...state.matrix,
          rows: action.payload.rows,
          dates: action.payload.dates,
          isRunning: false,
          isLoaded: true,
        },
        additionalOptions: action.payload.additional_options,
      };
    },
    [SettingsConstants.SETTINGS_ADDITIONAL_OPTIONS_FETCH_REQUEST](state, action) {
      return {
        ...state,
        matrix: {
          ...state.matrix,
          selection: {
            date: action.payload.selectedDate,
            quantity: action.payload.selectedQuantity,
          },
        },
      };
    },
    [SettingsConstants.REMOVE_SELECTION_PART](state, action) {
      return {
        ...state,
        options: {
          ...state.options,
          removed: state.options.removed.push(action.payload),
        },
      };
    },
    [SettingsConstants.PRE_PRESS_TEMPLATE_FETCH_REQUEST](state) {
      return {
        ...state,
        templates: {
          ...productSettingsState.templates,
          isRunning: true,
        },
      };
    },
    [SettingsConstants.PRE_PRESS_TEMPLATE_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        templates: {
          ...action.payload,
          parts: state.options.parts
            .reduce((prevPart, currentPart) => ({
              ...prevPart,
              [currentPart.id]: action.payload[currentPart.id],
            }), {}),
          downloadUrls: Object.keys(action.payload.options)
            .reduce((prevOption, nextOption) => ({
              ...prevOption,
              [nextOption]: action.payload.options[nextOption]
                .reduce((prevSoftware, currentSoftware) => ({
                  ...prevSoftware,
                  [currentSoftware]: '',
                }), {}),
            }), {}),
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [SettingsConstants.PRE_PRESS_TEMPLATE_FETCH_FAILURE](state) {
      return {
        ...state,
        templates: productSettingsState.templates,
      };
    },
    [SettingsConstants.PRE_PRESS_DOWNLOAD_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        templates: {
          ...state.templates,
          downloadUrls: {
            ...state.templates.downloadUrls,
            [action.payload.orientation]: {
              ...state.templates.downloadUrls[action.payload.orientation],
              [action.payload.extension]: action.payload.filePackageUrl,
            },
          },
        },
      };
    },
    [SettingsConstants.SETTINGS_PICKUP_FETCH_REQUEST](state) {
      return {
        ...state,
        config: {
          ...state.config,
          pickupPlaces: productSettingsState.config.pickupPlaces,
        },
      };
    },
    [SettingsConstants.SETTINGS_PICKUP_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        config: {
          ...state.config,
          pickupPlaces: action.payload,
        },
      };
    },
    [SettingsConstants.SETTINGS_PICKUP_FETCH_FAILURE](state) {
      return state;
    },
    [SettingsConstants.SETTINGS_SET_DELIVERY_METHOD](state, action) {
      return {
        ...state,
        matrix: {
          ...state.matrix,
          deliveryMethod: action.payload,
        },
      };
    },
  }),
};
