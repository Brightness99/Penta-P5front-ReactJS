/**
 * @module Reducers/Root
 * @desc Root Reducers
 */

import app from './app';
import router from './router';

export default {
  ...app,
  ...router,
};
