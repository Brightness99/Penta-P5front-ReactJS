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
  file: {
    url: '',
    isRunning: false,
    isLoaded: false,
  },
  briefing: {
    isRunning: false,
    isLoaded: false,
    data: {},
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
        file: {
          url: '',
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.SINGLE_FILE_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        file: {
          url: action.payload.url,
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

    [ArtCreationConstants.FILE_LIST_FETCH_REQUEST](state) {
      return {
        ...state,
        files: {
          ...state.files,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.FILE_LIST_FETCH_SUCCESS](state, action) {
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
    [ArtCreationConstants.FILE_LIST_FETCH_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },


    [ArtCreationConstants.BRIEFING_DETAILS_FETCH_REQUEST](state) {
      return {
        ...state,
        briefing: {
          ...state.briefing,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.BRIEFING_DETAILS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        briefing: {
          data: action.payload.data,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.BRIEFING_DETAILS_FETCH_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },

    [ArtCreationConstants.SAVE_BRIEFING_REQUEST](state) {
      return {
        ...state,
        briefing: {
          ...state.briefing,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.SAVE_BRIEFING_SUCCESS](state, action) {
      return {
        ...state,
        briefing: {
          data: action.payload.data,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.SAVE_BRIEFING_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },

    [ArtCreationConstants.UPDATE_BRIEFING_REQUEST](state) {
      return {
        ...state,
        briefing: {
          ...state.briefing,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.UPDATE_BRIEFING_SUCCESS](state, action) {
      return {
        ...state,
        briefing: {
          data: action.payload.data,
          isRunning: true,
          isLoaded: false,
        },
      };
    },
    [ArtCreationConstants.UPDATE_BRIEFING_FAILURE](state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },

  }),
};

