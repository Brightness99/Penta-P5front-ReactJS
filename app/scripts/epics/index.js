/**
 * @module Epics/Root
 * @desc Root Epics
 */

import { combineEpics } from 'redux-observable';
import {
  userNewsletter,
  userSignIn,
  userSignUp,
  userLogOut,
  userAuthValidate,
  userSocialSignIn,
  userSocialSignUp } from './user';
import { productsFetch } from './products';
import { blogFetch } from './blog';
import { glossarySlugFetch, glossaryFetch } from './glossary';
import {
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch,
  prepressDownloadFetch
} from './settings';
import { localeFetch } from './locale';
import {
  cartBasicFetch,
  cartFetch,
  cartAddFetch,
  cartDeleteFetch,
  cartDuplicateFetch,
  cartVoucherAddFetch,
  cartVoucherRemoveFetch,
  cartPickupFetch,
  cartUpdateFetch,
  cartUpsellingDateFetch,
  cartUpsellingAddFetch
} from './cart';

import { contactFormSend } from './contact-form';
import { socialLoginSettingsFetch } from './social-login-settings';

import {
  accountFetch,
  accountUpdate,
  accountAddressFetch,
  accountAddressCreate,
  accountAddressDelete,
  accountNotificationFetch,
  accountNotificationUpdate,
  accountSavedCreditCardFetch,
  accountSavedCreditCardDelete
} from './account';

import { termsFetch } from './terms';

export default combineEpics(
  userNewsletter,
  productsFetch,
  blogFetch,
  glossarySlugFetch,
  glossaryFetch,
  settingsFetch,
  settingsOptionsFetch,
  settingsSourceFetch,
  settingsZipcodeFetch,
  settingsMatrixFetch,
  prepressDownloadFetch,
  userSignIn,
  userSignUp,
  userSocialSignIn,
  userSocialSignUp,
  userLogOut,
  userAuthValidate,
  cartBasicFetch,
  cartFetch,
  cartAddFetch,
  cartDeleteFetch,
  cartDuplicateFetch,
  cartVoucherAddFetch,
  cartVoucherRemoveFetch,
  cartPickupFetch,
  cartUpdateFetch,
  cartUpsellingDateFetch,
  cartUpsellingAddFetch,
  localeFetch,
  contactFormSend,
  accountFetch,
  accountAddressFetch,
  accountUpdate,
  socialLoginSettingsFetch,
  accountAddressCreate,
  accountAddressDelete,
  accountSavedCreditCardFetch,
  accountSavedCreditCardDelete,
  accountNotificationFetch,
  accountNotificationUpdate,
  termsFetch,
);
