// @flow
/**
 * @module Reducers/App
 * @desc App Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer, mergeDeep } from 'utils/helpers';
import { LocaleConstants } from 'constants/index';
import locale from 'assets/json/localeMock.json';

console.log('tomar no cy', LocaleConstants);

const missingLocale = {
  translate: {
    common: {
      STARTING_FROM: 'A partir de',
    },
  },
};

export const appState = {
  rehydrated: false,
};

export default {
  locale: createReducer(appState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [LocaleConstants.LOCALE_FETCH_REQUEST]() {
      return appState;
    },
    [LocaleConstants.LOCALE_FETCH_SUCCESS](state, action) {
      return mergeDeep(
        {
          ...state,
          ...action.payload,
        },
        missingLocale
      );
    },
  }),
};
