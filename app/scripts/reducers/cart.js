// @flow
/**
 * @module Reducers/Cart
 * @desc Cart Reducer
 */

import { REHYDRATE } from 'redux-persist/constants';
import { createReducer, getScreenSize } from 'utils/helpers';
import { AppConstants } from 'constants/index';
import cartState from 'assets/json/cartMock.json';

export const appState = cartState;

export default {
  cart: createReducer(appState, {
    [REHYDRATE](state, action) {
      return Object.assign({}, state, action.payload.cart, {
        rehydrated: true,
      });
    },
  }),
};
