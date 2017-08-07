/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from 'redux-observable';
import { userNewsletter, userSignIn } from './user';
import { productsFetch } from './products';
import { blogFetch } from './blog';
import {
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch,
  prepressDownloadFetch
} from './settings';

import {
  cartBasicFetch,
  cartFetch,
  cartAddFetch,
  cartDeleteFetch,
  cartDuplicateFetch
} from './cart';

export default combineEpics(
  userNewsletter,
  productsFetch,
  blogFetch,
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch,
  prepressDownloadFetch,
  userSignIn,
  cartBasicFetch,
  cartFetch,
  cartAddFetch,
  cartDeleteFetch,
  cartDuplicateFetch,
);
