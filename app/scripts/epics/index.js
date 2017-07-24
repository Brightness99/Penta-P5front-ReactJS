/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from 'redux-observable';
import { userNewsletter } from './user';
import { productsFetch } from './products';
import { blogFetch } from './blog';
import {
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch
} from './settings';

export default combineEpics(
  userNewsletter,
  productsFetch,
  blogFetch,
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch,
);
