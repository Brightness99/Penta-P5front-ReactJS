/**
 * @module Reducers/Root
 * @desc Root Reducers
 */

import app from './app';
import blog from './blog';
import cart from './cart';
import locale from './locale';
import products from './products';
import settings from './settings';
import router from './router';
import user from './user';
import contactForm from './contact-form';
import account from './account';
import socialLoginSettings from './social-login-settings';

export default {
  ...app,
  ...blog,
  ...cart,
  ...locale,
  ...products,
  ...settings,
  ...router,
  ...user,
  ...contactForm,
  ...account,
  ...socialLoginSettings,
};
