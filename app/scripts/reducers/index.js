/**
 * @module Reducers/Root
 * @desc Root Reducers
 */

import app from './app';
import router from './router';
import locale from './locale';
import user from './user';

export default {
  ...app,
  ...router,
  ...locale,
  ...user,
};
