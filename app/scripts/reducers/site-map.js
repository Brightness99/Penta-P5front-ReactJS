// @flow
/**
 * @module Reducers/user
 * @desc user Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { SiteMapConstants } from 'constants/index';

type SiteMapState = {
  rehydrated: boolean,
  updatedAt: number,
  isRunning: boolean,
  isLoaded: boolean,
  error: boolean,
  message: string,
  items: []
}

export const siteMapState: SiteMapState = {
  rehydrated: false,
  updatedAt: 0,
  isRunning: false,
  isLoaded: false,
  error: false,
  message: '',
  items: [],
};

export default {
  siteMap: createReducer(siteMapState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [SiteMapConstants.SITE_MAP_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        isLoaded: false,
      };
    },
    [SiteMapConstants.SITE_MAP_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        items: action.payload,
        isRunning: false,
        isLoaded: true,
      };
    },
    [SiteMapConstants.SITE_MAP_FETCH_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        isLoaded: false,
        error: true,
        message: action.payload.message,
      };
    },
  }),
};

