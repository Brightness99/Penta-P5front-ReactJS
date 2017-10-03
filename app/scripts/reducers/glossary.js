// @flow
import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { GlossaryConstants } from 'constants/index';

export type GlossaryState = {
  rehydrated: boolean,
  glossary: {
    isRunning: boolean,
    isLoaded: boolean,
    error: boolean,
    message: string,
    availableIndexes: [],
    items: [],
  },
  glossaryFiler: {
    query: string
  },
  glossarySlug: {
    isRunning: boolean,
    error: boolean,
    message: string,
    glossary: {}
  },
  updatedAt: number,
};

export const glossaryState: GlossaryState = {
  rehydrated: false,
  glossary: {
    isRunning: false,
    isLoaded: false,
    error: false,
    message: '',
    availableIndexes: [],
    items: [],
  },
  glossaryFiler: {
    query: '',
  },
  glossarySlug: {
    isRunning: false,
    isLoaded: false,
    error: false,
    message: '',
    glossary: {},
  },
  updatedAt: 0,
};


export default {
  glossary: createReducer(glossaryState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [GlossaryConstants.GLOSSARY_FETCH_REQUEST](state) {
      return {
        ...state,
        glossary: {
          ...state.glossary,
          isRunning: true,
          isLoaded: false,
          error: false,
        },
      };
    },
    [GlossaryConstants.GLOSSARY_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        glossary: {
          ...state.glossary,
          isRunning: false,
          isLoaded: true,
          availableIndexes: action.payload.available_indexes,
          items: action.payload.items,
          glossaryList: action.payload,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [GlossaryConstants.GLOSSARY_FETCH_FAILURE](state, action) {
      return {
        ...state,
        glossary: {
          ...state.glossary,
          isRunning: false,
          error: true,
          message: action.payload.message,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [GlossaryConstants.GLOSSARY_SLUG_FETCH_REQUEST](state) {
      return {
        ...state,
        glossarySlug: {
          ...state.glossarySlug,
          isRunning: true,
          error: false,
        },
      };
    },
    [GlossaryConstants.GLOSSARY_SLUG_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        glossarySlug: {
          ...state.glossarySlug,
          isRunning: false,
          glossary: action.payload,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [GlossaryConstants.GLOSSARY_SLUG_FETCH_FAILURE](state, action) {
      return {
        ...state,
        glossarySlug: {
          ...state.glossarySlug,
          isRunning: false,
          error: true,
          message: action.payload.message,
        },
        updatedAt: action.meta.updatedAt,
      };
    },
    [GlossaryConstants.GLOSSARY_FILTER](state, action) {
      return {
        ...state,
        glossaryFiler: {
          query: action.payload,
        },
      };
    },
  }),
};
