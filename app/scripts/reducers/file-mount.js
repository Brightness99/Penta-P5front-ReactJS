/**
 * @module Reducers/FileMount
 * @desc FileMount Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { FileMountConstants } from 'constants/index';

export const productsState = {
  rehydrated: false,
  updatedAt: 0,
  mountData: {},
  isRunning: false,
  isLoaded: false,
  error: {},
};

export default {
  fileMount: createReducer(productsState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [FileMountConstants.FILE_MOUNT_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [FileMountConstants.FILE_MOUNT_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        mountData: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [FileMountConstants.FILE_MOUNT_FETCH_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },

    [FileMountConstants.FILE_MOUNT_ITEM_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [FileMountConstants.FILE_MOUNT_ITEM_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        mountData: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [FileMountConstants.FILE_MOUNT_ITEM_FETCH_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },
  }),
};
