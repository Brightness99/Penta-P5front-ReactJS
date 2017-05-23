/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from 'redux-observable';
import { userNewsletter } from './user';
import { productsFetch } from './products';
import { settingsFetch, settingsSourceFetch } from './settings';

export default combineEpics(
  userNewsletter,
  productsFetch,
  settingsFetch,
  settingsSourceFetch,
);
