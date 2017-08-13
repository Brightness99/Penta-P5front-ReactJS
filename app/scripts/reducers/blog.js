/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { BlogConstants } from 'constants/index';

export const blogState = {
  rehydrated: false,
  updatedAt: 0,
  blog: [],
  isRunning: false,
  isLoaded: false,
};

export default {
  blog: createReducer(blogState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [BlogConstants.BLOG_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [BlogConstants.BLOG_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        blog: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
  }),
};

