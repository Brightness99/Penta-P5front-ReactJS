// @flow

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { UploadConstants } from 'constants/index';

export type UploadState = {
  rehydrated: boolean,
  isRunning: boolean,
  error: boolean,
  message: string,
  object: {},
  uploadFile: {
    progress: number,
    preview: {},
    isRunning: boolean,
    error: boolean,
    message: string,
  },
  updatedAt: number,
};

export const uploadState: UploadState = {
  rehydrated: false,
  isRunning: false,
  error: false,
  message: '',
  object: {},
  updatedAt: 0,
  uploadFile: {
    progress: 0,
    preview: {},
    isRunning: false,
    error: false,
    message: '',
  },
};


export default {
  upload: createReducer(uploadState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [UploadConstants.UPLOAD_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        error: false,
      };
    },
    [UploadConstants.UPLOAD_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        isRunning: false,
        object: action.payload,
        updatedAt: action.meta.updatedAt,
      };
    },
    [UploadConstants.UPLOAD_FETCH_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        error: true,
        message: action.payload.message,
        updatedAt: action.meta.updatedAt,
      };
    },
    [UploadConstants.UPLOAD_FILE_REQUEST](state) {
      return {
        ...state,
        uploadFile: {
          progress: 0,
          preview: {},
          isRunning: true,
          error: false,
          message: '',
        },
      };
    },
    [UploadConstants.UPLOAD_FILE_PROGRESS](state, action) {
      return {
        ...state,
        uploadFile: {
          ...state.uploadFile,
          progress: action.payload,
        },
      };
    },
    [UploadConstants.UPLOAD_FILE_SUCCESS](state, action) {
      return {
        ...state,
        uploadFile: {
          ...state.uploadFile,
          progress: 100,
          preview: action.payload,
        },
      };
    },
    [UploadConstants.UPLOAD_FILE_FAILURE](state, action) {
      return {
        ...state,
        uploadFile: {
          ...state.uploadFile,
          isRunning: false,
          error: false,
          message: action.payload.message,
        },
      };
    },
    [UploadConstants.UPLOAD_FILE_CANCEL](state) {
      return {
        ...state,
        uploadFile: {
          ...state.uploadFile,
          isRunning: false,
        },
      };
    },
  }),
};
