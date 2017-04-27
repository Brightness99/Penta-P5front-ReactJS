/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from 'redux-observable';
import { userNewsletter } from './user';

export default combineEpics(
  userNewsletter,
);
