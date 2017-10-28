// @flow
import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { TemplatesConstants } from 'constants/index';

type Props = {
  rehydrated: boolean,
  updatedAt: number,
  templates: Array<TemplateType>,
  activeFinalId: string,
  detailedTemplates: {
    [key: string]: {
      [key: string]: ProductPartType,
    },
    error: { message: string, status: string },
    isRunning: boolean,
    isLoaded: boolean,
  },
  downloadData: DownloadDataType,
  error: { message: string, status: string },
  isRunning: boolean,
  isLoaded: boolean,
};

export const templatesState: Props = {
  rehydrated: false,
  updatedAt: 0,
  templates: [],
  activeFinalId: null,
  detailedTemplates: {
    error: null,
    isRunning: false,
    isLoaded: false,
  },
  downloadData: {
    error: null,
    data: null,
    isRunning: false,
    isLoaded: false,
    downloadOptions: null,
  },
  error: null,
  isRunning: false,
  isLoaded: false,
};

export default {
  templates: createReducer(templatesState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [TemplatesConstants.TEMPLATES_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [TemplatesConstants.TEMPLATES_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        templates: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [TemplatesConstants.TEMPLATES_FETCH_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [TemplatesConstants.FETCH_TEMPLATE_DETAILS_BY_ID_REQUEST](state) {
      return {
        ...state,
        detailedTemplates: {
          ...state.detailedTemplates,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [TemplatesConstants.FETCH_TEMPLATE_DETAILS_BY_ID_SUCCESS](state, action) {
      const { finalId, productParts } = action.payload;
      return {
        ...state,
        activeFinalId: finalId.slice(1),
        detailedTemplates: {
          [finalId]: {
            ...productParts,
          },
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [TemplatesConstants.FETCH_TEMPLATE_DETAILS_BY_ID_FAILURE](state, action) {
      return {
        ...state,
        detailedTemplates: {
          ...state.detailedTemplates,
          error: action.payload,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [TemplatesConstants.SET_ACTIVE_FINAL_ID](state, action) {
      return {
        ...state,
        activeFinalId: action.payload,
      };
    },
    [TemplatesConstants.FETCH_DOWNLOAD_TEMPLATES](state) {
      return {
        ...state,
        downloadData: {
          ...state.downloadData,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [TemplatesConstants.FETCH_DOWNLOAD_TEMPLATES_SUCCESS](state, action) {
      return {
        ...state,
        downloadData: {
          data: action.payload,
          downloadOptions: null,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [TemplatesConstants.FETCH_DOWNLOAD_TEMPLATES_FAILURE](state, action) {
      return {
        ...state,
        downloadData: {
          data: null,
          downloadOptions: null,
          error: action.payload,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [TemplatesConstants.FETCH_TEMPLATE](state) {
      return {
        ...state,
        downloadData: {
          ...state.downloadData,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [TemplatesConstants.FETCH_TEMPLATE_SUCCESS](state, action) {
      const { response, file, orientation } = action.payload;
      const downloadData = state.downloadData;
      const { downloadOptions } = downloadData;
      return {
        ...state,
        downloadData: {
          ...downloadData,
          downloadOptions: Object.assign({}, downloadOptions, {
            [file]: Object.assign({}, (downloadOptions || {})[file] || {}, {
              [orientation]: {
                url: response.filePackageUrl,
              },
            }),
          }),
          url: response.filePackageUrl,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [TemplatesConstants.FETCH_TEMPLATE_FAILURE](state, action) {
      return {
        ...state,
        downloadData: {
          data: null,
          url: null,
          error: action.payload,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [TemplatesConstants.START_TEMPLATE_DOWNLOAD](state) {
      return {
        ...state,
        downloadData: {
          ...state.downloadData,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [TemplatesConstants.FINISH_TEMPLATE_DOWNLOAD](state) {
      return {
        ...state,
        downloadData: {
          ...state.downloadData,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
  }),
};

