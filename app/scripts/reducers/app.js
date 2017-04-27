// @flow
/**
 * @module Reducers/App
 * @desc App Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';

export const appState = {
  rehydrated: false,
};

export default {
  app: createReducer(appState, {
    [REHYDRATE](state, action) {
      return Object.assign({}, state, action.payload.app, {
        rehydrated: true,
      });
    },
  }),
};
