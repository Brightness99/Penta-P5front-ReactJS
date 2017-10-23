// @flow

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { UploadConstants } from 'constants/index';

export type UploadState = {
  rehydrated: boolean,
  isRunning: boolean,
  isLoaded: boolean,
  error: boolean,
  message: string,
  object: {},
  uploadFile: {
    progress: number,
    preview: {},
    isRunning: boolean,
    isUploaded: boolean,
    error: boolean,
    message: string,
  },
  uploadFinish: {
    isRunning: boolean,
    error: boolean,
    message: string,
  },
  updatedAt: number,
};

export const uploadState: UploadState = {
  rehydrated: false,
  isRunning: false,
  isLoaded: false,
  error: false,
  message: '',
  object: {},
  updatedAt: 0,
  uploadFile: {
    progress: 0,
    preview: {},
    isRunning: false,
    isUploaded: false,
    error: false,
    message: '',
  },
  uploadFinish: {
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
        isLoaded: true,
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
          isUploaded: false,
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
          isRunning: false,
          isUploaded: true,
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
          isUploaded: false,
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
    [UploadConstants.UPLOAD_FINISH_REQUEST](state) {
      return {
        ...state,
        uploadFinish: {
          isRunning: true,
          error: false,
          message: '',
        },
      };
    },
    [UploadConstants.UPLOAD_FINISH_SUCCESS](state) {
      return {
        ...state,
        uploadFinish: {
          ...state.uploadFinish,
          isRunning: false,
        },
      };
    },
    [UploadConstants.UPLOAD_FINISH_FAILURE](state, action) {
      return {
        ...state,
        uploadFinish: {
          ...state.uploadFinish,
          isRunning: false,
          error: false,
          message: action.payload.message,
        },
      };
    },
    [UploadConstants.UPLOAD_FINISH_CANCEL](state) {
      return {
        ...state,
        uploadFinish: {
          ...state.uploadFinish,
          isRunning: false,
        },
      };
    },
  }),
};
