/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from 'redux-observable';
import { userNewsletter } from './user';
import { productsFetch } from './products';

export default combineEpics(
  userNewsletter,
  productsFetch,
);
