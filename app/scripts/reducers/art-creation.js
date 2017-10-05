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
  proposals: {},
};

export default {
  artCreation: createReducer(artCreationState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [ArtCreationConstants.PROPOSALS_FETCH_REQUEST]() {
      return {
        ...artCreationState,
        isRunning: true,
        isLoaded: false,
      };
    },
    [ArtCreationConstants.PROPOSALS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        proposals: action.payload.proposals,
        isRunning: false,
        isLoaded: true,
      };
    },
    [ArtCreationConstants.PROPOSALS_FETCH_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: true,
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
      console.log('action ====>', action);
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
  }),
};

