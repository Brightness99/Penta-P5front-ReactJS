// @flow

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils';

import { PrintiPressConstants } from 'constants/index';

export type PrintiPressState = {
  rehydrated: boolean,
  isRunning: boolean,
  error: boolean,
  message: string,
  updatedAt: number,
  press: []
};

export const printiPressState: PrintiPressState = {
  rehydrated: false,
  isRunning: false,
  press: [],
  error: false,
  message: '',
  updatedAt: 0,
};


export default {
  printiPress: createReducer(printiPressState, {
    [REHYDRATE](state) {
      return {
        ...state,
        rehydrated: true,
      };
    },
    [PrintiPressConstants.PRINTI_PRESS_FETCH_REQUEST](state) {
      return {
        ...state,
        isRunning: true,
        error: false,
        message: '',
      };
    },
    [PrintiPressConstants.PRINTI_PRESS_FETCH_SUCCESS](state, action) {
      return {
        ...state,
        isRunning: false,
        press: action.payload,
        updatedAt: action.meta.updatedAt,
      };
    },
    [PrintiPressConstants.PRINTI_PRESS_FETCH_FAILURE](state, action) {
      return {
        ...state,
        isRunning: false,
        error: true,
        message: action.payload.message,
        updatedAt: action.meta.updatedAt,
      };
    },
  }),
};
