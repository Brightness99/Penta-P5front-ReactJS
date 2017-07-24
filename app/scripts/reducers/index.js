/**
 * @module Reducers/Root
 * @desc Root Reducers
 */

import app from './app';
import blog from './blog';
import locale from './locale';
import products from './products';
import settings from './settings';
import router from './router';
import user from './user';

export default {
  ...app,
  ...blog,
  ...locale,
  ...products,
  ...settings,
  ...router,
  ...user,
};
