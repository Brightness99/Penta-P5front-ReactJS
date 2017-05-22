/**
 * @module Reducers/Root
 * @desc Root Reducers
 */

import app from './app';
import locale from './locale';
import products from './products';
import product_settings from './product_settings';
import router from './router';
import user from './user';

export default {
  ...app,
  ...locale,
  ...products,
  ...product_settings,
  ...router,
  ...user,
};
