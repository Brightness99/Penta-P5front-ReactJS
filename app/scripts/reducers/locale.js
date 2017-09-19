// @flow
/**
 * @module Reducers/App
 * @desc App Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer, mergeDeep } from 'utils/helpers';
import locale from 'assets/json/localeMock.json';

const missingLocale = {
  translate: {
    common: {
      STARTING_FROM: 'A partir de',
    },
  },
};

export const appState = mergeDeep(
  {
    ...locale,
    rehydrated: false,
  },
  missingLocale
);

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
