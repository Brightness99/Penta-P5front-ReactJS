/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { ArtCreationConstants } from 'constants/index';

export const artCreationState = {
  rehydrated: false,
  updatedAt: 0,
  isRunning: false,
  isLoaded: false,
  proposals: {
    list: [],
    isRunning: false,
    isLoaded: false,
  },
  files: {
    list: [],
    isRunning: false,
    isLoaded: false,
  },
};

export default {
  artCreation: createReducer(artCreationState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [ArtCreationConstants.PROPOSALS_FETCH_REQUEST](state) {
      return {
        ...artCreationState,
        proposals: {
          ...state.proposals,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.PROPOSALS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        proposals: {
          list: action.payload.proposals,
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [ArtCreationConstants.PROPOSALS_FETCH_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },

    [ArtCreationConstants.NEW_PROPOSAL_REQUEST_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [ArtCreationConstants.NEW_PROPOSAL_REQUEST_SUCCESS](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
      };
    },
    [ArtCreationConstants.NEW_PROPOSAL_REQUEST_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },

    [ArtCreationConstants.APPROVE_PROPOSAL_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [ArtCreationConstants.APPROVE_PROPOSAL_SUCCESS](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
      };
    },
    [ArtCreationConstants.APPROVE_PROPOSAL_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
        error: action.payload,
      };
    },

    [ArtCreationConstants.SINGLE_FILE_FETCH_REQUEST](state) {
      return {
        ...state,
        files: {
          ...state.files,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.SINGLE_FILE_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        files: {
          list: [
            ...state.files.list,
            ...{
              proposal_id: action.payload.proposal_id,
              file_id: action.payload.file_id,
              url: action.payload.url,
            },
          ],
          isRunning: false,
          isLoaded: true,
        },
      };
    },
    [ArtCreationConstants.SINGLE_FILE_FETCH_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  }),
};

