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
import policy from './policy';
import socialLoginSettings from './social-login-settings';
import terms from './terms';
import printiPress from './printi-press';
import glossary from './glossary';
import header from './header';
import upload from './upload';
import successfulPurchase from './successful-purchase';
import siteMap from './site-map';
import about from './about';
import fileMount from './file-mount';
import guide from './guide';
import templates from './templates';
import referral from './referral';

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
  ...policy,
  ...socialLoginSettings,
  ...terms,
  ...printiPress,
  ...glossary,
  ...header,
  ...upload,
  ...successfulPurchase,
  ...siteMap,
  ...about,
  ...fileMount,
  ...guide,
  ...templates,
  ...referral,
};
