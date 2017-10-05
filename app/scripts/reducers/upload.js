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
  updatedAt: number,
};

export const uploadState: UploadState = {
  rehydrated: false,
  isRunning: false,
  error: false,
  message: '',
  object: {},
  updatedAt: 0,
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
  }),
};
