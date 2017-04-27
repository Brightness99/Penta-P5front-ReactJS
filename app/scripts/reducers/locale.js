// @flow
/**
 * @module Reducers/App
 * @desc App Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';
import locale from 'assets/json/localeMock.json';

export const appState = {
  ...locale,
  rehydrated: false,
};

export default {
  locale: createReducer(appState, {
    [REHYDRATE](state, action) {
      return {
        ...state,
        ...action.payload.locale,
        rehydrated: true,
      };
    },
  }),
};
